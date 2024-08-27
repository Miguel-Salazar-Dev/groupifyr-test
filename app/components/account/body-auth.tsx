import { Divider } from '@nextui-org/react'
import { AuthButton } from './auth-button-client'
import HeaderAuth from './header-auth'
import FormAuth from './form-auth'
import FooterAuth from './footer-auth'

export default function BodyAuth ({ option }: { option: string }) {
  return (
      <section className='flex flex-col items-center justify-center max-w-[400px] w-11/12 mx-auto min-h-screen'>
        <div className='flex flex-col h-[550px] w-full rounded-lg border border-slate-400'>
          <div className='h-1/5 flex flex-row items-center'>
            <HeaderAuth option={option} />
          </div>
          <div className='h-1/5 flex flex-col items-center justify-center px-5'>
            <AuthButton />
            <Divider className='my-4' />
          </div>
          <div className='h-2/5 flex flex-col items-center justify-center px-5'>
            <FormAuth option={option} />
          </div>
          <div className='h-1/5 flex flex-col items-center justify-center px-5'>
            <FooterAuth option={option} />
          </div>
        </div>
      </section>
  )
}
