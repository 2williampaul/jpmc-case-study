# Vercel Deployment Fix

## The Problem
Your Next.js app is in the `jpmc-case-study/` subdirectory, but Vercel is looking for it in the root directory, causing a 404 error.

## The Solution

You need to configure Vercel to use `jpmc-case-study` as the Root Directory. Here's how:

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click on your `jpmc-case-study` project

### Step 2: Update Project Settings
1. Go to **Settings** → **General**
2. Scroll down to **Root Directory**
3. Click **Edit**
4. Enter: `jpmc-case-study`
5. Click **Save**

### Step 3: Redeploy
1. Go to the **Deployments** tab
2. Click the **⋯** (three dots) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeployment

## Alternative: If Root Directory Setting Doesn't Work

If for some reason you can't set the Root Directory, you can restructure the project by moving everything from `jpmc-case-study/` to the root directory. However, the Root Directory setting is the recommended and cleanest solution.

## Current Configuration
- ✅ `vercel.json` in root with build commands pointing to `jpmc-case-study/`
- ✅ `jpmc-case-study/vercel.json` with framework detection
- ✅ Local build works correctly
- ⚠️ **Root Directory must be set in Vercel dashboard to `jpmc-case-study`**

