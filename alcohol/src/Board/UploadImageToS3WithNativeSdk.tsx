import React ,{useState} from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET ='alcoholcocktail';
const REGION ="ap-northeast-2";


AWS.config.update({
    accessKeyId: process.env.REACT_APP_accessKeyId,
    secretAccessKey: process.env.REACT_APP_secretAccessKey 
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const UploadImageToS3WithNativeSdk = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e:any) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file:any) => {

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((PutObjectAclOutput,err) => {
                console.log(PutObjectAclOutput)
                if (err) console.log(err)
            })
    }

/*https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/example_s3_Scenario_GettingStarted_section.html*/
    return <div>
        <div>Native SDK File Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;