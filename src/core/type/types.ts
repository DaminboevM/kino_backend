export enum UserRole {
    SUPERADMIN = 'SUPERADMIN',
    USER = 'USER',
    ADMIN = 'ADMIN'
}


export enum Status {
    active = 'active', 
    expired = 'expired', 
    canceled = 'canceled', 
    pending_payment = 'pending_payment'
}


export enum PaymentMethod {
    card = 'card', 
    paypal = 'paypal', 
    bank_transfer = 'bank_transfer', 
    crypto = 'crypto'
}


export enum PymentStatus {
    pending = 'pending', 
    completed = 'completed', 
    failed = 'failed', 
    refunded = 'refunded'
}


export enum SubscriptionType {
    free = 'free', 
    premium = 'premium'
}


export enum Quality {
    '240p' = '240p', 
    '360p' = '360p', 
    '480p' = '480p', 
    '720p' = '720p', 
    '1080p' = '1080p', 
    '4K' = '4K'
}


export enum Language {
    UZ = 'UZ',
    EN = 'EN',
    RU = 'RU'
}