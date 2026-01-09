# Quick AWS Deployment - 5 Minutes

## 🚀 Fastest Way: Elastic Beanstalk

### Prerequisites:
```bash
# Install AWS CLI
brew install awscli  # macOS
# OR download from: https://aws.amazon.com/cli/

# Install EB CLI
pip install awsebcli

# Configure AWS
aws configure
# Enter your AWS Access Key ID and Secret
```

### Deploy in 5 Steps:

#### 1. Initialize
```bash
cd meri-dukaan-backend
eb init
# Select: Node.js, Node.js 20, region
```

#### 2. Create Environment
```bash
eb create staging-env
# Wait 5-10 minutes
```

#### 3. Setup Database (RDS)
- Go to AWS Console → RDS
- Create PostgreSQL 15 database
- Get endpoint URL

#### 4. Set Environment Variables
```bash
eb setenv \
  DATABASE_URL="postgresql://user:pass@your-db.xxxxx.rds.amazonaws.com:5432/meri_dukaan" \
  JWT_SECRET="your-secret-key" \
  PORT=8080 \
  NODE_ENV=staging
```

#### 5. Deploy
```bash
npm run build
eb deploy
```

### Get Your URL:
```bash
eb status
# Your staging URL will be shown
```

---

## 🎯 That's It!

Your backend is now live at:
- **API:** `http://staging-env.xxxxx.elasticbeanstalk.com`
- **Swagger:** `http://staging-env.xxxxx.elasticbeanstalk.com/api-docs`

Share this URL with frontend team! 🎉

---

## 📝 Next Steps:

1. Run migrations:
   ```bash
   eb ssh
   cd /var/app/current
   npm run prisma:migrate:deploy
   npm run prisma:seed
   ```

2. Test:
   - Open Swagger: `http://your-url/api-docs`
   - Test login endpoint

3. Share with frontend:
   - API URL
   - Swagger URL
   - Test credentials

---

**For detailed guide, see:** `AWS_DEPLOYMENT_GUIDE.md`

