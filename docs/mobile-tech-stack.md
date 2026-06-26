# Mobile Tech Stack

The technology choices for the **mobile app** - the parent and student apps, built with **Flutter** (Dart) for Android and iOS from one codebase. This is the client-only stack; the shared backend, database, auth, storage, payments, real-time, and hosting live in [product-tech-stack.md](product-tech-stack.md). For how these pieces are organized, see [mobile-architecture.md](mobile-architecture.md).

## Core

- **Flutter** - one UI toolkit, one codebase for Android + iOS.
- **Dart** - the language; strong typing and great tooling.

**Benefits:**

- Single codebase for both platforms.
- Smooth, consistent UI.
- Fast development with hot reload.

## State and dependency injection

- **Riverpod** - state management and DI.
- Alternative: **flutter_bloc** for teams that prefer the Bloc pattern.

> Why: server data is exposed via async providers backed by repositories; pure UI state uses lightweight notifiers.

## Networking and models

- **Dio** - HTTP client with interceptors (auth token, refresh, logging).
- **retrofit** - typed API client generated over Dio.
- **freezed** + **json_serializable** - immutable models and JSON parsing.

> Why: keeps JSON mapping out of the UI and gives one place to attach auth and school context.

## Routing

- **go_router** - declarative navigation with role-based redirects (parent vs student, auth gating).

## Storage and offline

- **flutter_secure_storage** - JWT access/refresh tokens in Keychain/Keystore.
- **Drift** (or **Isar**) - local database for offline access and caching.

> Why: offline access is a listed product requirement; tokens must never sit in plain preferences.

## Notifications

- **firebase_messaging** - push notifications (FCM): attendance alerts, fee reminders, homework, announcements.
- **flutter_local_notifications** - display and schedule local notifications.

## Authentication extras

- **local_auth** - biometric / Face ID / fingerprint unlock.
- **Firebase OTP** - phone OTP login for parents (see shared Auth in product-tech-stack.md).

## Device features

- **mobile_scanner** - QR scanning for QR attendance and digital ID cards.
- **image_picker** - capture/upload documents and photos.
- **cached_network_image** - efficient image loading and caching.

## Payments

- **Razorpay Flutter SDK** - in-app fee payments.

## Maps and location

- **google_maps_flutter** + **geolocator** - live bus tracking and pickup/drop location.

## Internationalization

- **Flutter localization** (`intl` / **easy_localization**) - multi-language support.

## Monitoring

- **Firebase Crashlytics** + **Analytics** - crash reporting and usage analytics (or **Sentry**).

## Testing

- **flutter_test** + **mocktail** - unit and widget tests.
- **integration_test** - end-to-end tests for critical journeys (login/OTP, attendance, fee payment, results).

## Build and release

- **Build flavors** + **flutter_dotenv** - per-environment config (dev/staging/prod).
- **Codemagic** or **Fastlane** - CI/CD for builds and store releases.

## Summary

| Area | Choice |
| --- | --- |
| **Framework** | Flutter, Dart |
| **State / DI** | Riverpod (alt: flutter_bloc) |
| **Networking** | Dio + retrofit |
| **Models** | freezed + json_serializable |
| **Routing** | go_router |
| **Storage** | flutter_secure_storage, Drift/Isar (offline) |
| **Notifications** | firebase_messaging, flutter_local_notifications |
| **Auth extras** | local_auth, Firebase OTP |
| **Device** | mobile_scanner, image_picker, cached_network_image |
| **Payments** | Razorpay Flutter SDK |
| **Maps** | google_maps_flutter, geolocator |
| **i18n** | intl / easy_localization |
| **Monitoring** | Firebase Crashlytics + Analytics (or Sentry) |
| **Testing** | flutter_test, mocktail, integration_test |
| **Build/CI** | flavors, flutter_dotenv, Codemagic/Fastlane |

For the web stack see [web-tech-stack.md](web-tech-stack.md); for the combined overview and shared backend/infra see [product-tech-stack.md](product-tech-stack.md).
