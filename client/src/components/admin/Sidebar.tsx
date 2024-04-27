"use client"
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBreadcrumb } from '@/contexts/BreadcrumbContext';
import { useEffect } from 'react';



const Sidebar = ({routes}: {routes:any[]}) => {
    const pathname = usePathname();

    const { breadcrumb, addItem, removeItem } = useBreadcrumb();

    useEffect(() => {
        addItem(
            {
                title: 'Dashboard',
                link: '/admin/dashboard',
                icon: 'home'
            }
        );

    }, []);

    return (
        <div className="fixed w-20 flex flex-col items-center bg-slate-200 h-screen">
            <div className="sidebar-brand border-b-2 py-4 border-gray-300 w-full">
                <Image src={'/isologo1.png'} width={50} height={50} alt='Isologo' className='mx-auto' />
            </div>
            <div className="sidebar-menu py-6 w-full">
                <ul className=''>
                    {
                        routes.map((route:any, index:number) => (
                            <li key={index} className={`py-4 flex flex-col items-center  text-gray-500 ${pathname === route.link ? 'text-black' : 'hover:text-gray-800'}`}>
                                <FontAwesomeIcon width={26} icon={route.icon} />
                                <Link className='text-sm' href={route.link}>{route.title}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;