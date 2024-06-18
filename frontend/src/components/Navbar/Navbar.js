// src/components/Navbar.js
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, HomeIcon, ChartBarIcon, UserIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/images/FreeMoney-logo.png';

const navigation = [
  { name: 'Resumo', href: '/', current: true, icon: HomeIcon, color: 'text-black' },
  { name: 'Simulações', href: '/simulacoes', current: false, icon: ChartBarIcon, color: 'text-black' },
  { name: 'Perfil', href: '/perfil', current: false, icon: UserIcon, color: 'text-black' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-24 items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 focus:text-project-blue">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="sm:absolute flex flex-shrink-0 items-center">
                <img className="h-20 w-20" src={logo} alt="Logo" />
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-8">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          'text-black hover:text-project-blue flex flex-col items-center rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                        <span>{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    'block rounded-md px-3 py-2 text-base font-medium text-black hover:text-project-blue focus:text-project-blue'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
