import React, { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import NavItem from './navItem';
import { IcoClose } from './icons';
import { LogoIcon } from './logos';
import Link from 'next/link';

export default function Nav({ status, setStatus, activeSection, showModal }) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettingsOpen = () => {
    setSettingsOpen(prevSettingsOpen => !prevSettingsOpen);
  };

  useEffect(() => {
    if (!!localStorage && !!localStorage.settingsOpen) {
      setSettingsOpen(localStorage.settingsOpen);
    }

    return () => {
      localStorage.settingsOpen = settingsOpen;
    };
  }, []);

  let sections = [
    { id: 'home', label: 'Dashboard', ico: 'dash', href: '/dashboard' },
    {
      id: 'operators',
      label: 'Operators',
      ico: 'operators',
      href: '/operators',
    },
    {
      id: 'user-management',
      label: 'User Management',
      ico: 'user-manage',
      href: '/user-management',
    },
    {
      id: 'settings',
      label: 'Settings',
      ico: 'settings',
      sections: [
        {
          id: 'settings/access-alerts',
          label: 'Access & Alerts',
          ico: 'access-alerts',
          href: '/settings/access-and-alerts',
        },
        {
          id: 'settings/compliance-letter',
          label: 'Compliance Letter',
          ico: 'compliance-letter',
          href: '/settings/compliance-letter',
        },
        {
          id: 'settings/documentation',
          label: 'Documentation',
          ico: 'documentation',
          href: '/settings/documentation',
        },
        {
          id: 'settings/sla-management',
          label: 'Sla',
          ico: 'sla',
          href: '/sla-management',
        },
        {
          id: 'settings/test-cards',
          label: 'Test Cards',
          ico: 'test-cards',
          href: '/settings/test-cards',
        },
      ],
    },
  ];

  const [offset = 0, setOffset] = useState(0);

  useLayoutEffect(() => {
    const maxw = 1688;

    navResize();
    window.addEventListener('resize', navResize);

    function navResize() {
      if (window.innerWidth >= maxw) {
        setOffset((window.innerWidth - maxw) / 2 + 24);
      } else if (window.innerWidth >= 1536) {
        setOffset(32);
      } else {
        setOffset(0);
      }
    }

    return () => {
      removeEventListener('resize', navResize);
    };
  }, []);

  return (
    <div
      className={
        (status ? 'menu-open ' : '') +
        `menu fixed ${
          !showModal && 'z-10'
        } w-menu lg:w-menu-lg h-full 2xl:h-main 2xl:w-menu bg-b-750 2xl:rounded-xl py-6 px-4 lg:px-0`
      }
      style={{ transform: `translateX(${offset}px)` }}
    >
      <div
        onClick={() => setStatus(false)}
        className="flex items-center bg-b-100 w-12 h-12 lg:hidden rounded-full cursor-pointer"
      >
        <IcoClose className="m-auto w-7 h-7 text-b-500 fill-current" />
      </div>
      <div className="hidden lg:flex justify-center 2xl:justify-start 2xl:px-6">
        <Link href="/dashboard">
          <a>
            <LogoIcon className="w-11 h-11 2xl:w-14 2xl:h-14" />
          </a>
        </Link>
      </div>
      <nav className="mt-6">
        {sections.map((s, index) => {
          const hasSubSections = !!s.sections;
          return (
            <Fragment key={`navItem-${index}`}>
              <NavItem
                active={!!activeSection.includes(s.id)}
                label={s.label}
                ico={s.ico}
                href={s.href}
                onClick={hasSubSections ? () => toggleSettingsOpen() : null}
              />
              {hasSubSections && settingsOpen
                ? s.sections.map((section, i) => (
                    <NavItem
                      active={!!(activeSection === section.id)}
                      label={section.label}
                      href={section.href}
                      ico={section.ico}
                      isSubSection
                      key={`navSubItem-${i}`}
                    />
                  ))
                : null}
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}
