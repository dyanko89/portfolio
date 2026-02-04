# AWS SES Setup - Portfolio Contact Form

**Status:** ⏳ Awaiting Production Approval
**Created:** 2026-02-04
**AWS Account:** 6LUK (new account)

---

## Completed

- [x] Created new AWS account (6LUK)
- [x] Created IAM user for CLI access
- [x] Created SES identity for `djy89.net`
- [x] Configured Easy DKIM (2048-bit)
- [x] Configured MAIL FROM domain (`mail.djy89.net`)
- [x] Added DNS records (DKIM CNAMEs, MX, SPF)
- [x] Submitted production access request

---

## Pending

- [ ] **Production access approval** (typically 24-48 hours)
- [ ] Create IAM access keys (account was <24hrs old, try again later)
- [ ] Configure AWS CLI profile `6LUK`
- [ ] Create `.env.local` with SES credentials
- [ ] Update contact form API to use SES (replace Resend)
- [ ] Implement auto-response email to form submitters
- [ ] Implement delivery notifications (optional)
- [ ] Test end-to-end flow

---

## Configuration Reference

| Setting | Value |
|---------|-------|
| AWS Account | 6LUK |
| Region | us-east-1 |
| Domain | djy89.net |
| MAIL FROM | mail.djy89.net |
| From Email | danny@djy89.net |
| DKIM | Easy DKIM, 2048-bit |

---

## Files to Create/Modify

1. **`.env.local`** - AWS credentials and SES settings
2. **`app/api/contact/route.ts`** - Replace Resend with SES
3. **`lib/email/ses.ts`** - SES client and email functions (new)

---

## Next Steps

Once production access is approved:

1. Create access key for IAM user
2. Run `aws configure --profile 6LUK`
3. Verify with `aws sts get-caller-identity --profile 6LUK`
4. Create `.env.local` with credentials
5. Implement SES integration

---

## Contact Form Features (Planned)

1. **Notification to Danny** - When someone submits the form
2. **Auto-response to submitter** - Confirmation they'll hear back
3. **Delivery tracking** (optional) - SNS notifications for bounces/complaints
