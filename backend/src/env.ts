import { z } from 'zod'
 
const EnvSchema = z.object({
  PORT: z.string(),
  USER_NAME: z.string().min(1),
  PASSWORD: z.string().min(1),
  CONNECTION_STRING: z.string().min(1),
  DB_POOL_MIN: z.string().min(1),
  DB_POOL_MAX: z.string().min(1),
  DB_POOL_INC: z.string().min(1),
})
 
const parsedEnv = EnvSchema.safeParse(process.env)
 
if (!parsedEnv.success) {
  console.error(
    'Invalid environment variables:',
    parsedEnv.error.flatten().fieldErrors
  )
  process.exit(1) // Exit the application with an error code
}
 
export const env = Object.freeze(parsedEnv.data)
 
