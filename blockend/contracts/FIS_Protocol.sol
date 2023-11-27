//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface MintingInterface {
    function mint(address account, uint256 amount) external;
}

contract FISContract {
    uint256 public groupCount;
    address private immutable i_owner;

    IERC20 public piggyToken;
    MintingInterface public minter;
    uint256 private rate = 1;
    uint256 private percentageRewardPerDay = 2;
    uint256 private investmentCount;

    enum GroupVisibility {
        CIRCLE,
        PUBLIC
    }

    enum Status {
        IN_PROGRESS,
        SUCCESS,
        FAILED
    }

    struct TokenSavingsData {
        address tokenAddress;
        uint256 tokenBalance;
        uint256 saveDuration;
        uint256 timeSaved;
        uint256 tokenRewards;
    }

    struct User {
        address walletAddress;
        uint256 telosBalance;
        uint256 telosDuration;
        uint256 timeSaved;
        address[] tokens;
        uint256 rewardsEarned;
        uint256[] groups;
        address[] circle; 
        uint256 goal;
        uint256 investmentCollateral;
        uint256[] investments;
    }

    struct Group {
        uint256 id;
        uint256 duration;
        uint256 targetAmount;
        uint256 savedAmount;
        GroupVisibility visibility;
        string title;
        string description;
        uint category;
        address[] groupMembers;
        address creator;
        uint timeCreated;
    }

    struct Investment {
        uint256 id;
        string title;
        string description;
        uint256 depositPrice;
        uint256 duration;
        uint256 percentInterest;
        address[] investmentParticipants;
        bool open;
        Status status;

    }

    mapping(address => mapping(address => bool)) 
    private userAddressToAddressInCircle;
    mapping(address => mapping(address => bool)) private userIsSavingToken;

    mapping(uint256 => mapping(address => bool)) private investmentToUserAddress;

    mapping(address => mapping(uint256 => bool)) private addressToGroupId;

    mapping(uint => Group) private groupById;

    mapping(address => mapping(address => TokenSavingsData))
        private userAddressToTokenToData;

    mapping(address => User) private userAddressToUserData;

    // mapping(address => Investment) private userInvestments;

    mapping(uint256 => Investment) private idToinvestment;


    // Array

    Group[] private allGroups;
    Investment[] private allInvestments;

    event SaveToken(
        address indexed tokenAddress,
        uint256 saveDuration,
        uint256 timeSaved,
        uint256 tokenBalance
    );
    event SaveTelos(
        uint256 telosDuration,
        uint256 timeSaved,
        uint256 tokenBalance
    );
    event Goal(uint256 setGoal);
    event GroupCreated(Group groupDetails);
    // event GroupVisibilityStatus(
    //     uint256 indexed id,
    //     GroupVisibility _visibility
    // );
    event CircleAdded(address[] indexed circle, bool circleMemberAdded);
    event GroupJoined(Group groupDetails);
    event TelosWithdrawn(uint256 amount);
    // event LeftGroup(Group groupDetails);

    constructor(address tokenAddress) {
        minter = MintingInterface(tokenAddress);
        i_owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == i_owner, "Not owner");
        _;
    }

    function saveTokens(
        address tokenAddress,
        uint256 amount,
        uint duration
    ) external {
        require(amount > 0, "Include amount!");
        IERC20 token = IERC20(tokenAddress);
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Not approved");

        TokenSavingsData storage userTokenData = userAddressToTokenToData[msg.sender][tokenAddress];

        userTokenData.saveDuration = block.timestamp + (duration * 1 days);
        userTokenData.tokenBalance += amount;
        userTokenData.tokenAddress = tokenAddress;

        if (userIsSavingToken[msg.sender][tokenAddress] == false) {
            userIsSavingToken[msg.sender][tokenAddress] == true;
            userAddressToUserData[msg.sender].tokens.push(tokenAddress);
        }
        

        token.transferFrom(msg.sender, address(this), amount);

        emit SaveToken(
            tokenAddress,
            userTokenData.saveDuration,
            duration,
            userTokenData.tokenBalance
        );
    }

    function saveTelos(uint256 duration) external payable {
        require(msg.value > 0, "No money sent");
        User storage user = userAddressToUserData[msg.sender];
        user.telosBalance += msg.value;
        user.telosDuration = duration;
        user.timeSaved = block.timestamp;

        for (uint256 i; i < user.groups.length; i++) {
            uint256 groupId = user.groups[i];
            groupById[groupId].savedAmount += msg.value;
            allGroups[groupId].savedAmount += msg.value;

        }

        emit SaveTelos(
            duration,
            block.timestamp,
            userAddressToUserData[msg.sender].telosBalance
        );
    }

    function setGoal(uint256 goalAmount) external {
        userAddressToUserData[msg.sender].goal = goalAmount;

        emit Goal(goalAmount);
    }

    function createGroup(
        uint256 _duration,
        uint256 _targetAmount,
        GroupVisibility _visibility,
        string calldata _title,
        string calldata _description,
        uint _category
    ) external {
        groupCount++;

        Group memory group = Group(
            groupCount,
            _duration,
            _targetAmount,
            0,
            _visibility,
            _title,
            _description,
            _category,
            new address[](0),
            msg.sender,
            block.timestamp
        );

        groupById[groupCount] = group;

        User storage groupOwner = userAddressToUserData[msg.sender];
        // groupOwner.groups.push(Group(groupCount, _targetTime, _targetAmount, _visibility));
        groupOwner.groups.push(groupCount);

        allGroups.push(group);

        emit GroupCreated(
            Group(
                groupCount,
                block.timestamp + (_duration * 1 days),
                _targetAmount,
                0,
                _visibility,
                _title,
                _description,
                _category,
                new address[](0),
                msg.sender,
                block.timestamp
            )
        );
    }

    // function editGroupVisibility(uint256 id, GroupVisibility _visibility) external {
    //     Group storage groupToBeEdited = groupById[id];
    //     require(msg.sender == groupToBeEdited.creator); // only creator
    //     groupToBeEdited.visibility = _visibility;
    //     allGroups[id - 1].visibility = _visibility;

    //     emit GroupVisibilityStatus(id, _visibility);
    // }

    function addToCircle(address _circleAddress) external {
        require(_circleAddress != address(0), "Invalid address");
        User storage user = userAddressToUserData[msg.sender];
        user.circle.push(_circleAddress);
        userAddressToAddressInCircle[msg.sender][_circleAddress] = true;
        emit CircleAdded(user.circle, true);
    }

    function joinGroup(uint id) external {
        require(addressToGroupId[msg.sender][id] == false, "Already joined");
        User storage user = userAddressToUserData[msg.sender];
        Group storage groupToJoin = groupById[id];

        if (groupToJoin.visibility == GroupVisibility.PUBLIC) {
            user.groups.push(id);
            groupToJoin.groupMembers.push(msg.sender);
        } else {
            address creatorAddress = groupToJoin.creator;

            if (creatorAddress == msg.sender) {
                user.groups.push(id);
                groupToJoin.groupMembers.push(msg.sender);
            } else {
                require(userAddressToAddressInCircle[creatorAddress][msg.sender] == true, 
                "Not In Circle");
            
                user.groups.push(id);
                groupToJoin.groupMembers.push(msg.sender);
            }
        }

        allGroups[id -1] = groupToJoin;
        addressToGroupId[msg.sender][id] = true;
        emit GroupJoined(groupToJoin);
    }

    // function leaveGroup(uint id) external {
    //     require(addressToGroupId[msg.sender][id] == true);
    //     User storage user = userAddressToUserData[msg.sender];
    //     Group storage groupToLeave = groupById[id];

    //     // TODO: Delete user from array
    //     allGroups[id -1] = groupToLeave;
    //     emit LeftGroup(groupToLeave);
    // }


    function withdrawTelos(uint amount) external {
        // require time and calc charge
        User storage user = userAddressToUserData[msg.sender];
        uint balance = user.telosBalance;
        require(balance >= amount, "Insufficient funds");
        unchecked {
            user.telosBalance -= amount;
        }
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");

        for (uint256 i; i < user.groups.length; i++) {
            uint256 groupId = user.groups[i];
            groupById[groupId].savedAmount -= amount;
            allGroups[groupId].savedAmount -= amount;

        }

        emit TelosWithdrawn(amount);
    }

    function withdrawTokens(address tokenAddress, uint amount) external {
        TokenSavingsData storage userTokenData = userAddressToTokenToData[msg.sender][tokenAddress];
        uint balance = userTokenData.tokenBalance;
        require(balance >= amount, "Insufficient funds");
        unchecked {
            userTokenData.tokenBalance -= amount;
        }

        if (userTokenData.tokenBalance <= 1e8) { // Anything less than the 10th decimal is ignored
            userIsSavingToken[msg.sender][tokenAddress] = false;
            address[] storage userTokensList = userAddressToUserData[msg.sender].tokens;
            address[] memory newTokensList = new address[](userTokensList.length - 1);
            for (uint256 i; i < userTokensList.length; i++) {
                if (userTokensList[i] != tokenAddress) {
                    newTokensList[i] = userTokensList[i];
                }
            }
        }
        IERC20 token = IERC20(tokenAddress);
        token.transfer(msg.sender, amount);

        // TODO: Make it to be 0 like rewardsEarnes

        // emit BalanceWithdrawn(msg.sender, amount);
    }

    function withdrawTokenRewards(
        // uint tokenAddress, 
        uint amount) external {
        uint totalRewards = userAddressToUserData[msg.sender].rewardsEarned;
        require((totalRewards * 1e18) >= amount, "Insufficient funds");
        unchecked {
            userAddressToUserData[msg.sender].rewardsEarned -= amount;
        }

        minter.mint(msg.sender, amount);

        // emit BalanceWithdrawn(msg.sender, amount);
    }


    // INVESTMENT
    // TODO: Set admin to change investment goals
    // TODO: Delete investments

    function createInvestment(
        string memory _title,
        string memory _description,
        uint256 _depositPrice,
        uint256 _duration,
        uint256 _percentInterest
    ) external onlyOwner {
        // Make it only owner
        require(
            _percentInterest >= 10 && _percentInterest <= 20,
            "Not in percent range"
        );
        investmentCount++;

        Investment memory investment = Investment(
            investmentCount,
            _title,
            _description,
            _depositPrice,
            _duration,
            _percentInterest,
            new address[](0),
            true,
            Status.IN_PROGRESS
        );
        idToinvestment[investmentCount] = investment;
        allInvestments.push(investment);
    } 

    function invest(uint256 id) external {
        // User storage addUserToInvestment = userAddressToTokenToData[msg.sender][tokenAddress];
        User storage user = userAddressToUserData[msg.sender];

        require(investmentToUserAddress[id][msg.sender] == false, 
        "Already Invested");

        require(
            user.telosBalance >=
                idToinvestment[id].depositPrice,
            "Insufficient funds"
        );

        user.investments.push(id);
        idToinvestment[id].investmentParticipants.push(msg.sender);
        investmentToUserAddress[id][msg.sender] = true;

        // TODO: Owner[i_owner] +=

        // TODO: transfer collateral
    }

    // TODO: Admin disburses profit #onlyOwner

    function circleMembers() external view returns (address[] memory) {
        return userAddressToUserData[msg.sender].circle;
    }

    function getGroupById(uint id) external view returns (Group memory) {
        return groupById[id];
    }

    function getAllGroups() external view returns (Group[] memory) {
        return allGroups;
    }

    function getUser() external view returns (User memory) {
        return userAddressToUserData[msg.sender];
    }

    function updateRewards() external {
        User storage userData = userAddressToUserData[msg.sender];
        address[] memory userTokensAddresses = userData.tokens;
        for (uint i = 0; i < userTokensAddresses.length; i++) {
            TokenSavingsData storage tokenData = userAddressToTokenToData[
                msg.sender
            ][userTokensAddresses[i]];
            // update rewards
            uint256 secondsPassed = (block.timestamp - tokenData.timeSaved);
            if (secondsPassed >= 86400) {
                uint256 newRewards = (tokenData.tokenBalance *
                    secondsPassed *
                    (calcRewardsPerSeconds(percentageRewardPerDay) * rate)) /
                    1e18;
                userData.rewardsEarned += newRewards;
                tokenData.timeSaved = block.timestamp;
                tokenData.tokenRewards += newRewards;
            }
        }

    }       

    function getUserTokensData() external view returns (TokenSavingsData[] memory) {
        address[] memory userTokensAddresses = userAddressToUserData[msg.sender].tokens;

        TokenSavingsData[] memory listOfUserTokensData = new TokenSavingsData[](
            userTokensAddresses.length
        );

        for (uint i = 0; i < userTokensAddresses.length; i++) {
            TokenSavingsData storage tokenData = userAddressToTokenToData[
                msg.sender
            ][userTokensAddresses[i]];
            listOfUserTokensData[i] = tokenData;
        }
        return listOfUserTokensData;
    }


    function changePerentageRewardPerDay(uint256 _value) external {
        percentageRewardPerDay = _value;
    }

    function calcRewardsPerSeconds(
        uint dailyRate
    ) internal pure returns (uint256) {
        return (dailyRate * 1e16) / (24 * 60 * 60);
    }

    function getAllInvestments() external view returns (Investment[] memory) {
        return allInvestments;
    }

    function getInvestmentById(
        uint id
    ) external view returns (Investment memory) {
        return idToinvestment[id];
    }

    // function getAllUserInvestments() external view returns (Investment[] memory) {
    //     uint256[] memory allUserInvestmentsIds = userAddressToUserData[
    //         msg.sender
    //     ].investments;
    //     Investment[] memory allUserInvestments = new Investment[](
    //         allUserInvestmentsIds.length
    //     );
    //     for (uint i = 0; i < allUserInvestmentsIds.length; i++) {
    //         allUserInvestments[i] = idToinvestment[allUserInvestmentsIds[i]];
    //     }

    //     return allUserInvestments;
    // }

    // function getTokenStatus() public view returns(uint256, uint256) {
    //     uint256 allowance = ecdisToken.allowance(msg.sender, address(this));
    //     uint256 balance = ecdisToken.balanceOf(msg.sender);
    //     return (allowance, balance);
    // }
}