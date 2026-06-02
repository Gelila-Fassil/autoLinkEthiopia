import { createHash } from 'crypto'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

function getAuth(): { cloudName: string; apiKey: string; apiSecret: string } {
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Missing Cloudinary environment variables')
  }
  return { cloudName, apiKey, apiSecret }
}

export async function uploadImage(base64: string): Promise<string> {
  const { cloudName: cn, apiKey: ak, apiSecret: s } = getAuth()

  const timestamp = Math.round(Date.now() / 1000)
  const folder = 'autolink'

  const params = `folder=${folder}&timestamp=${timestamp}`
  const signature = createHash('sha1').update(params + s).digest('hex')

  const formData = new URLSearchParams()
  formData.append('file', base64)
  formData.append('folder', folder)
  formData.append('timestamp', String(timestamp))
  formData.append('api_key', ak)
  formData.append('signature', signature)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cn}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Cloudinary upload failed (${res.status}): ${errBody}`)
  }

  const data = await res.json()
  return data.secure_url as string
}
