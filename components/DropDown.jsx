import React from 'react'
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import LocaleBtn from './LocaleBtn'
import { useRouter, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";

import us from "@/public/united-states.png"
import dk from "@/public/denmark.png"
import { Link } from "@/i18n/routing";

const DropDown = ({logOut}) => {
    const router = useRouter();
    const t = useTranslations("Navbar");
    const pathname = usePathname();

    const handleLocaleChange = (locale) => {
      router.push(pathname, { locale });
    };
  return (
    
    
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 hover:text-zinc-400 cursor-pointer">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>
        {t("profile")}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {/* <DropdownMenuItem>
          Profile
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem> */}
        {/* <DropdownMenuItem>
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </DropdownMenuItem> */}
          <DropdownMenuItem>
          <Link
                  className=" dark:text-zinc-200 hover:text-gray-500 "
                  href="/mychats">
                  {t("myChats")}
                </Link>
                
           <DropdownMenuShortcut><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>
</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem>
        <Link
                  className="  hover:text-gray-500"
                  href="/chat">
                    {t("newChat")}
                </Link>
           <DropdownMenuShortcut> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
                     <Link
                  className=" hover:text-gray-500"
                  href="/settings">
                  {t("settings")}
                </Link>

          {/* <DropdownMenuShortcut></DropdownMenuShortcut> */}
        </DropdownMenuItem>
        {/* <DropdownMenuItem>
          Keyboard shortcuts
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {/* <DropdownMenuItem>Team</DropdownMenuItem> */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>    <p className='hover:text-gray-500'>
                {t("lng")}
            </p>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleLocaleChange("en")}>
            <Image src={us} width={15} height={15} ></Image>
            {t("english")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleLocaleChange("da")}>
          <Image src={dk} width={15} height={15} ></Image>

            {t("danish")}
          </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {/* <DropdownMenuItem>
          New Team
          <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem> */}
      </DropdownMenuGroup>
      {/* <DropdownMenuSeparator /> */}
      {/* <DropdownMenuItem>GitHub</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuItem disabled>API</DropdownMenuItem> */}
      <DropdownMenuSeparator />
      <DropdownMenuItem >
        <p onClick={logOut} className='cursor-pointer'>

      {t("logout")}
        </p>
      <DropdownMenuShortcut><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
</svg>
</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DropDown