export interface VerifyOtpResponseModel {
    status?: number;
    data?:   Data;
}

export interface Data {
    token?:  string;
    userId?: number;
}

// Responsemodel
export interface ResponseModel {
    status?: number;
    data?:   string;
}