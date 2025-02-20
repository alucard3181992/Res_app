
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { PanelMenu } from 'primereact/panelmenu';
import { Badge } from 'primereact/badge';
import { Image } from 'primereact/image';
import Link from 'next/link';

export default function MenubarTerminado() {
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    )
    const itemRenderer2 = (item) => (
        <Link href={'/'} className='especial'>
            <Image width='150' alt='Cargando Imagen' height='50' src='/icons/img/logo.png'></Image>
        </Link>
    )

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Home2',
            icon: 'pi pi-home',
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Projects',
            icon: 'pi pi-search',
            items: [
                {
                    label: 'Core',
                    icon: 'pi pi-bolt',
                    shortcut: '⌘+S',
                    template: itemRenderer
                },
                {
                    label: 'Blocks',
                    icon: 'pi pi-server',
                    shortcut: '⌘+B',
                    template: itemRenderer
                },
                {
                    label: 'UI Kit',
                    icon: 'pi pi-pencil',
                    shortcut: '⌘+U',
                    template: itemRenderer
                },
                {
                    separator: true
                },
                {
                    label: 'Templates',
                    icon: 'pi pi-palette',
                    items: [
                        {
                            label: 'Apollo',
                            icon: 'pi pi-palette',
                            badge: 2,
                            template: itemRenderer
                        },
                        {
                            label: 'Ultima',
                            icon: 'pi pi-palette',
                            badge: 3,
                            template: itemRenderer
                        }
                    ]
                }
            ]
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
            template: itemRenderer
        }
    ]

    const middleIndex = Math.ceil(items.length / 2)

    const especialItem = {
        label: 'Especial',
        icon: 'pi pi-home',
        template: itemRenderer2
    }

    items.splice(middleIndex, 0, especialItem);

    const start = <Image alt='Cargando Imagen' height='40' src="https://primefaces.org/cdn/primereact/images/logo.png" className="mr-2"></Image>;
    const end = (
        <div className="logoEspecial">
            <Link href={'/'} >
                <Image width='150' height='50' alt="Cargando Imagen..." src='/icons/img/logo.png'></Image>
            </Link>
        </div>
    )
    const [p, setP] = useState("")
    const hola = () => {
        if (p === "") {
            setP("p-menubar-mobile-active")
        } else {
            setP("")
        }

    }
    return (<React.Fragment>
        <div className="card especialmenu">
            <Menubar model={items} start={start} end={end} />
        </div>
    </React.Fragment>)
}
