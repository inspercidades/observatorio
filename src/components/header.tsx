"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const projetosItems = [
  {
    title: "Catálogo de Dados",
    href: "/projetos/catalago-de-dados",
    description: "Navegue por um catálogo interativo com dados de mobilidade de diversas cidades brasileiras.",
  },
  {
    title: "Dashboard PEMOB",
    href: "/projetos/dashboard",
    description: "Visualize dados espaciais e de mobilidade urbana em mapa interativo com camadas temáticas e ferramentas de visualização.",
  },

  {
    title: "Dados PEMOB",
    href: "/projetos/tabela",
    description: "Explore indicadores de mobilidade de diferentes cidades brasileiras em uma tabela interativa.",
  },
  {
    title: "Painel QualiÔnibus",
    href: "/projetos/dashboard-wri-brasil",
    description: "Parceria ONMS & WRI Brasil - Dashboard dos dados do QualiÔnibus.",
  },
]
const menuItems = [
  { title: "Sobre", href: "/sobre" },
  { title: "Publicações", href: "/publicacoes" },
  { title: "Eventos", href: "/eventos" },
  { title: "Vídeos", href: "/videos" },
  { title: "Cursos", href: "/cursos" },
]

interface HeaderProps {
  isBgDark?: boolean
  className?: string
}

export function Header({ isBgDark = false, className }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Define text color classes based on background
  const activeTextClass = isBgDark ? "text-white! font-medium!" : "text-black! font-medium!"
  const inactiveTextClass = isBgDark ? "text-white/50! hover:text-white/100!" : "text-black/50! hover:text-black/100!"

  // Check if current path contains "geoportal"
  const isGeoportalPage = pathname.includes("geoportal");
  const isMobilidadePage = pathname.startsWith("/projetos/") && !isGeoportalPage;
  
  return (
    <header className={`z-50 w-full ${className} ${isMobileMenuOpen ? 'bg-white' : isGeoportalPage ? 'bg-none!' : isBgDark ? 'bg-gradient-to-b from-[#242424] to-[#242424]/0' : ''}`}>
      <div className="flex h-28 items-center justify-between px-4 2xl:px-16">
        {/* Logo and Desktop Navigation (keep this part exactly the same) */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-4">
              {/* Main Logo Graphic */}
              <div className="flex items-center">
                <Image
                  src={isBgDark && isMobileMenuOpen ? "/logo-preto.png" : isBgDark && !isMobileMenuOpen ? "/logo-branco.png" : "/logo-preto.png"}
                  alt="Logo Observatório"
                  width={400}
                  height={80}
                  // className=""
                  priority
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/sobre" className={pathname === "/sobre" ? activeTextClass : inactiveTextClass}>
                  Sobre
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/projetos/geoportal" className={isGeoportalPage ? activeTextClass : inactiveTextClass}>
                  GeoPortal
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger 
                isBgDark={isBgDark}
                isActive={isMobilidadePage}
                className={isMobilidadePage ? activeTextClass : inactiveTextClass}
              >
                Mobilidade em dados
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[600px] gap-3 p-2 md:grid-cols-2 lg:w-[600px]">
                  {projetosItems.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/publicacoes" className={pathname.startsWith("/publicacoes") ? activeTextClass : inactiveTextClass}>
                  Publicações
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/eventos" className={pathname === "/eventos" ? activeTextClass : inactiveTextClass}>
                  Eventos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/videos" className={pathname === "/videos" ? activeTextClass : inactiveTextClass}>
                  Vídeos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/cursos" className={pathname === "/cursos" ? activeTextClass : inactiveTextClass}>
                  Cursos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className={`lg:hidden p-2 cursor-pointer transition-colors ${
            isMobileMenuOpen 
              ? "text-black hover:text-black/50" 
              : isBgDark 
                ? "text-white hover:text-white/50" 
                : "text-black hover:text-black/50"
          }`}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown (appears below header) */}
      <div 
        className={`lg:hidden absolute left-0 right-0 z-40 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? "h-lvh opacity-100 overflow-y-auto" 
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className=" px-7 py-6">
          <nav className="space-y-4">
            {/* Sobre */}
            <Link
              href="/sobre"
              onClick={closeMobileMenu}
              className={`block py-3 text-lg font-medium transition-colors ${
                pathname === "/sobre" ? "text-black font-medium" : "text-gray-400 hover:text-black"
              }`}
            >
              Sobre
            </Link>

            <Link
              href="/projetos/geoportal"
              onClick={closeMobileMenu}
              className={`block py-3 text-lg font-medium transition-colors ${
                isGeoportalPage ? "text-black font-medium" : "text-gray-400 hover:text-black"
              }`}
            >
              GeoPortal
            </Link>

            {/* Projetos Section with Accordion */}
            <div className="">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="projetos" className="border-none">
                  <AccordionTrigger className={`text-lg font-medium text-black hover:no-underline py-3 ${
                    isMobilidadePage ? "text-black font-medium" : "text-gray-400 hover:text-black"
                  }`}>
                    Mobilidade em dados
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {projetosItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block"
                        >
                          <div className={`font-medium mb-2 ${
                            pathname === item.href ? "text-black" : "text-gray-400 hover:text-black"
                          }`}>
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Other Menu Items */}
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block py-3 text-lg font-medium transition-colors ${
                  (item.title === "Publicações" && pathname.startsWith("/publicacoes")) || 
                  (item.title !== "Publicações" && pathname === item.href) 
                    ? "text-black font-medium" 
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}