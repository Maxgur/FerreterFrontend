import { useState } from 'react'
import { NavLink } from "react-router-dom"
import "./NavBar.css"
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'


export function NavBar({toggleCurrency,currentCurrency}) {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
   
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
    };


    return (
        <header className="bg-white fixed top-0 left-0 right-0 z-50 shadow-md" >
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1 ">
                    <NavLink className="-m-1.5 p-1.5 " to="/">
                        <span className="sr-only">Ferreteria LM</span>
                        <img alt="" src="/logolm.svg" className="h-8 w-auto mr-3" />
                    </NavLink><p className='company-name'>Ferreteria LM</p>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>

                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <NavLink className="text-sm font-semibold leading-6 text-gray-900" to="/inicio">
                        Inicio
                    </NavLink>

                    <NavLink className="text-sm font-semibold leading-6 text-gray-900" to="/products">
                        Productos
                    </NavLink>

                    <NavLink className="text-sm font-semibold leading-6 text-gray-900" to="/contactanos">
                        Contactanos
                    </NavLink>

                    <NavLink className="text-sm font-semibold leading-6 text-gray-900" to="/login">
                        Log in
                    </NavLink>
                              
                  
                </PopoverGroup>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">Ferreteria LM</span>
                            <img
                                alt=""
                                src=""
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <NavLink
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    to="/inicio"
                                    onClick={handleLinkClick}
                                >
                                    Inicio
                                </NavLink>

                                <NavLink
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    to="/products"
                                    onClick={handleLinkClick}
                                >
                                    Productos
                                </NavLink>

                                <NavLink
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    to="/contactanos"
                                    onClick={handleLinkClick}
                                >
                                    Contactanos
                                </NavLink>

                                <NavLink
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    to="/login"
                                    onClick={handleLinkClick}
                                >
                                    Log in
                                </NavLink>

                                                                
                            </div>

                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}