import { v2 as cloudinary } from 'cloudinary'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('Missing Cloudinary environment variables - uploads will fail')
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  })
}

export async function uploadImage(base64: string): Promise<string> {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary environment variables')
  }

  const result = await cloudinary.uploader.upload(base64, {
    folder: 'autolink',
  })

  return result.secure_url
}
