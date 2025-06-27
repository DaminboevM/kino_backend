w# Kinolar sayti loyihasi

## Loyiha sharhi

Foydalanuvchilar kino ko'rish, sevimlilarga qo'shish va obuna bo'lish imkoniyatiga ega bo'lgan kinolar saytini yaratish. Admin va superadmin kinoların boshqarishlari, yangi kontentlarni qo'shishlari mumkin.

## Ma'lumotlar bazasi strukturasi

### Users jadval

```
id: UUID PRIMARY KEY
username: VARCHAR(50) UNIQUE
email: VARCHAR(100) UNIQUE
password_hash: VARCHAR(255)
role: ENUM('user', 'admin', 'superadmin') DEFAULT 'user'
avatar_url: VARCHAR(255)
created_at: TIMESTAMP DEFAULT NOW()
```

### Profiles jadval

```
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY REFERENCES users(id)
full_name: VARCHAR(100)
phone: VARCHAR(20)
country: VARCHAR(50)
created_at: TIMESTAMP DEFAULT NOW()
```

### Subscription_plans jadval

```
id: UUID PRIMARY KEY
name: VARCHAR(50)
price: DECIMAL(10, 2)
duration_days: INTEGER
features: JSON
is_active: BOOLEAN DEFAULT TRUE
```

### User_subscriptions jadval

```
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY REFERENCES users(id)
plan_id: UUID FOREIGN KEY REFERENCES subscription_plans(id)
start_date: TIMESTAMP DEFAULT NOW()
end_date: TIMESTAMP
status: ENUM('active', 'expired', 'canceled', 'pending_payment') DEFAULT 'pending_payment'
auto_renew: BOOLEAN DEFAULT FALSE
created_at: TIMESTAMP DEFAULT NOW()
```

### Payments jadval

```
id: UUID PRIMARY KEY
user_subscription_id: UUID FOREIGN KEY REFERENCES user_subscriptions(id)
amount: DECIMAL(10, 2)
payment_method: ENUM('card', 'paypal', 'bank_transfer', 'crypto')
payment_details: JSON
status: ENUM('pending', 'completed', 'failed', 'refunded')
external_transaction_id: VARCHAR(100)
created_at: TIMESTAMP DEFAULT NOW()
```

### Categories jadval

```
id: UUID PRIMARY KEY
name: VARCHAR(50)
slug: VARCHAR(50) UNIQUE
description: TEXT
```

### Movies jadval

```
id: UUID PRIMARY KEY
title: VARCHAR(100)
slug: VARCHAR(100) UNIQUE
description: TEXT
release_year: INTEGER
duration_minutes: INTEGER
poster_url: VARCHAR(255)
rating: DECIMAL(3, 1)
subscription_type: ENUM('free', 'premium') DEFAULT 'free'
view_count: INTEGER DEFAULT 0
created_by: UUID FOREIGN KEY REFERENCES users(id)
created_at: TIMESTAMP DEFAULT NOW()
```

### Movie_categories jadval

```
id: UUID PRIMARY KEY
movie_id: UUID FOREIGN KEY REFERENCES movies(id)
category_id: UUID FOREIGN KEY REFERENCES categories(id)
```

### Movie_files jadval

```
id: UUID PRIMARY KEY
movie_id: UUID FOREIGN KEY REFERENCES movies(id)
file_url: VARCHAR(255)
quality: ENUM('240p', '360p', '480p', '720p', '1080p', '4K')
language: VARCHAR(20) DEFAULT 'uz'
```

### Favorites jadval

```
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY REFERENCES users(id)
movie_id: UUID FOREIGN KEY REFERENCES movies(id)
created_at: TIMESTAMP DEFAULT NOW()
```

### Reviews jadval

```
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY REFERENCES users(id)
movie_id: UUID FOREIGN KEY REFERENCES movies(id)
rating: INTEGER CHECK (rating >= 1 AND rating <= 5)
comment: TEXT
created_at: TIMESTAMP DEFAULT NOW()
```

### Watch_history jadval

```
id: UUID PRIMARY KEY
user_id: UUID FOREIGN KEY REFERENCES users(id)
movie_id: UUID FOREIGN KEY REFERENCES movies(id)
watched_duration: INTEGER
watched_percentage: DECIMAL(5, 2)
last_watched: TIMESTAMP DEFAULT NOW()
```

## Rolllar va ruxsatlar (RBAC)

### Superadmin roli

- Adminlarni boshqarish
- Obuna rejalarini boshqarish
- Tizim sozlamalarini o'zgartirish

### Admin roli

- Kinolarni qo'shish, tahrirlash, o'chirish
- Kategoriyalarni boshqarish
- Foydalanuvchilar sharhlarini moderatsiya qilish

### User roli

- Profil ma'lumotlarini tahrirlash
- Kinolarni ko'rish (obuna turiga qarab)
- Kinolarni sevimlilar ro'yxatiga qo'shish
- Sharh qoldirish
- Obuna sotib olish

## Endpointlar

### Autentifikatsiya

1. **POST /api/auth/register**

   - Request:
     ```json
     {
       "username": "alijon",
       "email": "alijon@example.com",
       "password": "12345678"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Ro'yxatdan muvaffaqiyatli o'tdingiz",
       "data": {
         "user_id": "550e8400-e29b-41d4-a716-446655440000",
         "username": "alijon",
         "role": "user",
         "created_at": "2025-05-12T14:30:45Z"
       }
     }
     ```

2. **POST /api/auth/login**

   - Request:
     ```json
     {
       "email": "alijon@example.com",
       "password": "12345678"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Muvaffaqiyatli kirildi",
       "data": {
         "user_id": "550e8400-e29b-41d4-a716-446655440000",
         "username": "alijon",
         "role": "user",
         "subscription": {
           "plan_name": "Free",
           "expires_at": null
         }
       }
     }
     ```
   - Cookie: `auth_token` o'rnatiladi

3. **POST /api/auth/logout**
   - Response:
     ```json
     {
       "success": true,
       "message": "Muvaffaqiyatli tizimdan chiqildi"
     }
     ```
   - Cookie: `auth_token` tozalanadi

### Profil

1. **GET /api/profile**

   - Response:
     ```json
     {
       "success": true,
       "data": {
         "user_id": "550e8400-e29b-41d4-a716-446655440000",
         "full_name": "Aliyev Vali",
         "phone": "+998901234567",
         "country": "Uzbekistan",
         "created_at": "2025-05-12T14:30:45Z",
         "avatar_url": "https://example.com/avatars/alijon.jpg"
       }
     }
     ```

2. **PUT /api/profile**
   - Request:
     ```json
     {
       "full_name": "Aliyev Valijon",
       "phone": "+998901234567",
       "country": "Uzbekistan"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Profil muvaffaqiyatli yangilandi",
       "data": {
         "user_id": "550e8400-e29b-41d4-a716-446655440000",
         "full_name": "Aliyev Valijon",
         "phone": "+998901234567",
         "country": "Uzbekistan",
         "updated_at": "2025-05-12T15:45:30Z"
       }
     }
     ```

### Obunalar

1. **GET /api/subscription/plans**

   - Response:
     ```json
     {
       "success": true,
       "data": [
         {
           "id": "550e8400-e29b-41d4-a716-446655440001",
           "name": "Free",
           "price": 0.0,
           "duration_days": 0,
           "features": ["SD sifatli kinolar", "Reklama bilan"]
         },
         {
           "id": "550e8400-e29b-41d4-a716-446655440002",
           "name": "Premium",
           "price": 49.99,
           "duration_days": 30,
           "features": ["HD sifatli kinolar", "Reklamasiz", "Yangi kinolar"]
         }
       ]
     }
     ```

2. **POST /api/subscription/purchase**
   - Request:
     ```json
     {
       "plan_id": "550e8400-e29b-41d4-a716-446655440002",
       "payment_method": "card",
       "auto_renew": true,
       "payment_details": {
         "card_number": "4242XXXXXXXX4242",
         "expiry": "04/26",
         "card_holder": "ALIJON VALIYEV"
       }
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Obuna muvaffaqiyatli sotib olindi",
       "data": {
         "subscription": {
           "id": "550e8400-e29b-41d4-a716-446655440010",
           "plan": {
             "id": "550e8400-e29b-41d4-a716-446655440002",
             "name": "Premium"
           },
           "start_date": "2025-05-12T16:10:22Z",
           "end_date": "2025-06-11T16:10:22Z",
           "status": "active",
           "auto_renew": true
         },
         "payment": {
           "id": "550e8400-e29b-41d4-a716-446655440011",
           "amount": 49.99,
           "status": "completed",
           "external_transaction_id": "txn_123456789",
           "payment_method": "card"
         }
       }
     }
     ```

### Kinolar

1. **GET /api/movies**

   - Query params: `page=1&limit=20&category=action&search=qasoskorlar&subscription_type=free`
   - Response:
     ```json
     {
       "success": true,
       "data": {
         "movies": [
           {
             "id": "550e8400-e29b-41d4-a716-446655440020",
             "title": "Qasoskorlar: Abadiyat Jangi",
             "slug": "qasoskorlar-abadiyat-jangi",
             "poster_url": "https://example.com/posters/infinity-war.jpg",
             "release_year": 2018,
             "rating": 8.5,
             "subscription_type": "free",
             "categories": ["Action", "Adventure", "Sci-Fi"]
           },
           {
             "id": "550e8400-e29b-41d4-a716-446655440021",
             "title": "Qasoskorlar: Yakuniy o'yin",
             "slug": "qasoskorlar-yakuniy-oyin",
             "poster_url": "https://example.com/posters/endgame.jpg",
             "release_year": 2019,
             "rating": 8.7,
             "subscription_type": "premium",
             "categories": ["Action", "Adventure", "Drama"]
           }
         ],
         "pagination": {
           "total": 50,
           "page": 1,
           "limit": 20,
           "pages": 3
         }
       }
     }
     ```

2. **GET /api/movies/{slug}**

   - Response:
     ```json
     {
       "success": true,
       "data": {
         "id": "550e8400-e29b-41d4-a716-446655440020",
         "title": "Qasoskorlar: Abadiyat Jangi",
         "slug": "qasoskorlar-abadiyat-jangi",
         "description": "Qasoskorlar va ularning ittifoqchilari barcha avvalgi g'alabalaridan keyin ham Yerning eng katta xavfi bilan to'qnashishadi.",
         "release_year": 2018,
         "duration_minutes": 149,
         "poster_url": "https://example.com/posters/infinity-war.jpg",
         "rating": 8.5,
         "subscription_type": "free",
         "view_count": 15423,
         "is_favorite": true,
         "categories": ["Action", "Adventure", "Sci-Fi"],
         "files": [
           {
             "quality": "480p",
             "language": "uz",
             "size_mb": 800
           },
           {
             "quality": "720p",
             "language": "uz",
             "size_mb": 1500
           }
         ],
         "reviews": {
           "average_rating": 4.7,
           "count": 352
         }
       }
     }
     ```

### Sevimlilar

1. **GET /api/favorites**

   - Response:
     ```json
     {
       "success": true,
       "data": {
         "movies": [
           {
             "id": "550e8400-e29b-41d4-a716-446655440020",
             "title": "Qasoskorlar: Abadiyat Jangi",
             "slug": "qasoskorlar-abadiyat-jangi",
             "poster_url": "https://example.com/posters/infinity-war.jpg",
             "release_year": 2018,
             "rating": 8.5,
             "subscription_type": "free"
           }
         ],
         "total": 12
       }
     }
     ```

2. **POST /api/favorites**

   - Request:
     ```json
     {
       "movie_id": "550e8400-e29b-41d4-a716-446655440021"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Kino sevimlilar ro'yxatiga qo'shildi",
       "data": {
         "id": "550e8400-e29b-41d4-a716-446655440070",
         "movie_id": "550e8400-e29b-41d4-a716-446655440021",
         "movie_title": "Qasoskorlar: Yakuniy o'yin",
         "created_at": "2025-05-12T19:20:15Z"
       }
     }
     ```

3. **DELETE /api/favorites/{movie_id}**
   - Response:
     ```json
     {
       "success": true,
       "message": "Kino sevimlilar ro'yxatidan o'chirildi"
     }
     ```

### Sharhlar

1. **POST /api/movies/{movie_id}/reviews**

   - Request:
     ```json
     {
       "rating": 5,
       "comment": "Juda ajoyib film, ko'rishni tavsiya etaman!"
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Sharh muvaffaqiyatli qo'shildi",
       "data": {
         "id": "550e8400-e29b-41d4-a716-446655440080",
         "user": {
           "id": "550e8400-e29b-41d4-a716-446655440000",
           "username": "alijon"
         },
         "movie_id": "550e8400-e29b-41d4-a716-446655440021",
         "rating": 5,
         "comment": "Juda ajoyib film, ko'rishni tavsiya etaman!",
         "created_at": "2025-05-12T20:15:30Z"
       }
     }
     ```

2. **DELETE /api/movies/{movie_id}/reviews/{review_id}**
   - Response:
     ```json
     {
       "success": true,
       "message": "Sharh muvaffaqiyatli o'chirildi"
     }
     ```

### Admin paneli

1. **GET /api/admin/movies**

   - Response:
     ```json
     {
       "success": true,
       "data": {
         "movies": [
           {
             "id": "550e8400-e29b-41d4-a716-446655440020",
             "title": "Qasoskorlar: Abadiyat Jangi",
             "slug": "qasoskorlar-abadiyat-jangi",
             "release_year": 2018,
             "subscription_type": "free",
             "view_count": 15423,
             "review_count": 352,
             "created_at": "2024-01-15T10:30:00Z",
             "created_by": "admin1"
           }
         ],
         "total": 256
       }
     }
     ```

2. **POST /api/admin/movies**

   - Request: Multipart form bilan
     ```
     title: Yangi Film
     description: Film ta'rifi
     release_year: 2024
     duration_minutes: 120
     subscription_type: premium
     category_ids: ["id1", "id2"]
     poster: <binary data>
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Yangi kino muvaffaqiyatli qo'shildi",
       "data": {
         "id": "550e8400-e29b-41d4-a716-446655440090",
         "title": "Yangi Film",
         "slug": "yangi-film",
         "created_at": "2025-05-12T22:10:45Z"
       }
     }
     ```

3. **PUT /api/admin/movies/{movie_id}**

   - Request:
     ```json
     {
       "title": "Yangilangan Sarlavha",
       "description": "Yangilangan ta'rif",
       "subscription_type": "premium",
       "category_ids": ["id1", "id2"]
     }
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Kino muvaffaqiyatli yangilandi",
       "data": {
         "id": "550e8400-e29b-41d4-a716-446655440090",
         "title": "Yangilangan Sarlavha",
         "updated_at": "2025-05-12T23:05:30Z"
       }
     }
     ```

4. **DELETE /api/admin/movies/{movie_id}**

   - Response:
     ```json
     {
       "success": true,
       "message": "Kino muvaffaqiyatli o'chirildi"
     }
     ```

5. **POST /api/admin/movies/{movie_id}/files**
   - Request: Multipart form bilan
     ```
     file: <binary data>
     quality: 720p
     language: uz
     ```
   - Response:
     ```json
     {
       "success": true,
       "message": "Kino fayli muvaffaqiyatli yuklandi",
       "data": {
         "id": "550e8400-e29b-41d4-a716-446655440095",
         "movie_id": "550e8400-e29b-41d4-a716-446655440090",
         "quality": "720p",
         "language": "uz",
         "size_mb": 1750,
         "file_url": "https://example.com/movies/yangi-film-720p.mp4"
       }
     }
     ```
