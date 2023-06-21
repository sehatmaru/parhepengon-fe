export class CreateGroupRequestModel {
    public groupName = ''
    public category = ''
    public secureId = ''
}

export class AddKickMemberRequestModel {
    public member = ''
    public group = ''
}

export class MemberResponseModel {
    public secureId = ''
    public fullName = ''
    public joinedAt = new Date()
}

export class GroupResponseModel {
    public secureId = ''
    public name = ''
    public category = ''
    public totalBalance = 0
    public funder = false
    public joinedAt = new Date()
}

export class GroupDetailResponseModel {
    public secureId = ''
    public name = ''
    public category = ''
    public createdAt = new Date()
    public createdBy = ''
    public lastUpdated = new Date()
    public history: GroupHistoryResponseModel[] = [];
    public member: GroupMemberResponseModel[] = [];
    public bills: GroupBillResponseModel[] = [];
}

export class GroupHistoryResponseModel {
    public event = ''
    public createdAt = new Date()
    public createdBy = ''
    public comment = ''
}

export class GroupMemberResponseModel {
    public secureId = ''
    public name = ''
    public joinedAt = new Date()
    public leaveAt = new Date()
}

export class GroupBillResponseModel {
    public secureId = ''
    public title = ''
    public amount = 0
    public prepaidBy = ''
    public settle = false
}