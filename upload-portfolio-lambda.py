import boto3
import StringIO
import zipfile
import mimetypes

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-west-2:671818931470:deployPortfolioTopic')

    try:
        s3 = boto3.resource('s3')

        portfolio_bucket = s3.Bucket('portfolio.food-guides.com')
        build_bucket = s3.Bucket('food-guides-portfolio')

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj('portfoliobuild.zip',portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(obj,nm,
                ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]})
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
        print "Job Done!"
        topic.publish(Subject="Portfolio deployed", Message="Portfolio deployed succsessfully")
    except:
        topic.publish(Subject="Portfolio deployed Failed", Message="The Portfolio was NOT deployed succsessfully")
        raise
    return 'Hello from Lambda'