export class CreateBillRequestModel {
    public title = ''
    public method = ''
    public group = ''
    public amount = 0
    public prepaidBy = ''
    public member: BillModel[] = []
    public category = ''
    public secureId = ''
}

export class BillModel {
    public member = ''
    public amount = 0
    public amountPercentage = 0
}

export class AddCommentRequest {
    public bill = ''
    public value = ''
}

export class BillResponseModel {
    public secureId = ''
    public title = ''
    public category = ''
    public totalAmount = 0
    public settle = false
}

export class BillDetailResponseModel {
    public secureId = ''
    public title = ''
    public category = ''
    public createdAt = new Date()
    public createdBy = ''
    public totalAmount = 0
    public method = ''
    public settle = false
    public settleAt = new Date()
    public lastUpdated = new Date()
    public history: BillHistoryResponseModel[] = [];
    public member: BillMemberResponseModel[] = [];
}

export class BillHistoryResponseModel {
    public event = ''
    public createdAt = new Date()
    public createdBy = ''
    public comment = ''
}

export class BillMemberResponseModel {
    public secureId = ''
    public name = ''
    public amount = 0
    public amountPercentage = 0
}
