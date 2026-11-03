/*
# Remove pet and spirit beast system from database

## Overview
This migration removes all pet-related database objects from the 1/8 Oracle app.
The pet feature has been fully removed from the frontend; this cleans up the schema.

## Changes
1. Drops the `pets` table entirely (data, policies, indexes, constraints)
2. Drops the foreign key constraint `users_current_pet_id_fkey` on `users`
3. Removes `current_pet_id` column from `users`
4. Removes `sign_in_streak` column from `users`
5. Removes the `idx_pets_user_id` index (dropped automatically with table)

## Important Notes
1. The `readings` table is completely untouched — daily drawing continues to work.
2. RLS policies on `users` and `readings` are unchanged.
3. This is a destructive migration (DROP TABLE, DROP COLUMN) and is safe because:
   - The app no longer references any pet data
   - Pet data is ephemeral app content, not user-created critical data
*/

-- Drop FK constraint from users.current_pet_id → pets
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_current_pet_id_fkey;

-- Drop the pets table entirely (cascades policies, indexes, constraints)
DROP TABLE IF EXISTS pets CASCADE;

-- Remove pet-related columns from users
ALTER TABLE users DROP COLUMN IF EXISTS current_pet_id;
ALTER TABLE users DROP COLUMN IF EXISTS sign_in_streak;
