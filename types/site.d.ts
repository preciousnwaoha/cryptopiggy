export type UserType = {
    walletAddress: string,
    telosBalance: number,
    tokens: string[],
    rewardsEarned: number,
    groups: number[],
    circle: string[],
    goal: number,
    telosDuration: number,
    timeSaved: number
}

export type TokenSavingDataType = {
    tokenAddress: string,
    tokenBalance: number,
    saveDuration: number,
    timeSaved: number,
tokenRewards: number,
}

export type GroupType = {
    id: number,
    targetAmount: number,
    savedAmount: number,
    duration: number, 
    visibility: number,
    groupMembers: string[],
    creator:string,
    title: string,
    description: string,
    createdAt: number, 
}


export type InvestmentType = {
    id: number,
    title: string,
    description: string,
    depositPrice: number,
    duration: number,
    percentInterest: number,
    investmentParticipants: string[],
    open: boolean,
    status: number,
}
