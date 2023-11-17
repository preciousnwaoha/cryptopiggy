import {UserType, GroupType, TokenSavingDataType, InvestmentType} from "@/types/site"


export const USER: UserType = {
    walletAddress: "0x7476deB582C24610511D16266E972DF5d2895bc7",
    telosBalance: 0.1,
    tokens: [],
    rewardsEarned: 0.3,
    groups: [],
    circle: ["0x35eBcBE067d77915C27476ff24ab779B8fC3025e"],
    goal: 10,
    telosDuration: 30,
    timeSaved: 1
}



export const USER_TOKENS: TokenSavingDataType[] = [
    {
        tokenAddress: "",
        tokenBalance: 0,
        saveDuration: 0,
        timeSaved: 0,
        tokenRewards: 0,
    },
    {
        tokenAddress: "",
        tokenBalance: 0,
        saveDuration: 0,
        timeSaved: 0,
        tokenRewards: 0,
    },
    {
        tokenAddress: "",
        tokenBalance: 0,
        saveDuration: 0,
        timeSaved: 0,
        tokenRewards: 0,
    }
]

export const SAVING_GROUPS: GroupType[] = [
    {
        id: 1,
        creator: "0x7476deB582C24610511D16266E972DF5d2895bc7",
        title: "Save Towards Your Vacation",
        description: "Setup a personal savings goal for your Vacation.",
        targetAmount: 100,
        savedAmount: 63, 
        duration: 10, 
        visibility: 1,
        groupMembers: [],
        createdAt: 1700020289123, 
    },
    {
        id: 2,
        creator: "0x7476deB582C24610511D16266E972DF5d2895bc7",
        targetAmount: 100,
        savedAmount: 63, 
        title: "Save for your business",
        description: "Setup a personal savings goal for your Business.",
        duration: 10,
        visibility: 1,
        groupMembers: [],
        createdAt: 1700020289123, 
    },
    {
        id: 3,
        creator: "0x35eBcBE067d77915C27476ff24ab779B8fC3025e",
        title: "Save for your Rent",
        description: "Setup a personal savings goal to pay your Rent.",
        targetAmount: 100,
        savedAmount: 63, 
        duration: 10, 
        visibility: 1,
        groupMembers: [],
        createdAt: 1700020289123, 
    }
]

export const INVESTMENTS: InvestmentType[] = [
    {
        id: 1,
        title: "Chicken Farm at Old Carolina",
        description: "Let's make money",
        depositPrice: 10,
        duration: 1,
        percentInterest: 12,
        investmentParticipants: [],
        open: true,
        status: 0,
    },
    {
        id: 1,
        title: "Chicken Farm at Old Carolina",
        description: "Let's make money",
        depositPrice: 10,
        duration: 1,
        percentInterest: 12,
        investmentParticipants: [],
        open: true,
        status: 0,
    },
    {
        id: 1,
        title: "Chicken Farm at Old Carolina",
        description: "Let's make money",
        depositPrice: 10,
        duration: 1,
        percentInterest: 12,
        investmentParticipants: [],
        open: true,
        status: 0,
    },
    {
        id: 1,
        title: "Chicken Farm at Old Carolina",
        description: "Let's make money",
        depositPrice: 10,
        duration: 1,
        percentInterest: 12,
        investmentParticipants: [],
        open: true,
        status: 0,
    },
]