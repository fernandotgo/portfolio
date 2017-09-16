import boto3
import StringIO
import zipfile
import mimetypes

#configure resource
s3 = boto3.resource('s3')

#configure bucket name
portfolio_bucket = s3.Bucket('portfolio.food-guides.com')
build_bucket = s3.Bucket('food-guides-portfolio')

#download zip file
portfolio_zip = StringIO.StringIO()
build_bucket.download_fileobj('portfoliobuild.zip',portfolio_zip)

#reads zipfile and uploads to S3 bucket with public-read ACL
with zipfile.ZipFile(portfolio_zip) as myzip:
    for nm in myzip.namelist():
        obj = myzip.open(nm)
        portfolio_bucket.upload_fileobj(obj,nm,
        ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]})
        portfolio_bucket.Object(nm).Acl().put(ACL='public-read')
