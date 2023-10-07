import { Footer } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function FooterSitemapLinks() {
  return (
    <Footer bgDark>
      <div className="w-full">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <Footer.Title title="Company" className='text-bold text-blue-600' />
            <Footer.LinkGroup col>
              <Footer.Link href="#" className='text-blue-600'> About  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Careers  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Brand Center  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Blog  </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="help center" className='text-bold text-blue-600' />
            <Footer.LinkGroup col>
              <Footer.Link href="#" className='text-blue-600'> Discord Server  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Twitter  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Facebook  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'>  Contact Us  </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="legal" className='text-bold text-blue-600' />
            <Footer.LinkGroup col>
              <Footer.Link href="#" className='text-blue-600'>  Privacy Policy  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Licensing   </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Terms & Conditions  </Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <Footer.Title title="download" className='text-bold text-blue-600' />
            <Footer.LinkGroup col>
              <Footer.Link href="#" className='text-blue-600'> iOS </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Android  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'> Windows  </Footer.Link>
              <Footer.Link href="#" className='text-blue-600'>  MacOS  </Footer.Link>
            </Footer.LinkGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-center">
          <Footer.Copyright
            className='mx-16 text-green-400 font-bold'
            by="Ticketvibe™"
            href="/"
            year={2023}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
            />
            <Footer.Icon
              href="#"
              icon={BsGithub}
            />
          </div>
        </div>
      </div>
    </Footer>
  )
}