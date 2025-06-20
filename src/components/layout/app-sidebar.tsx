"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NAV_ITEMS } from "@/lib/constants";
import { Settings, LogOut } from "lucide-react";
import AppLogo from "@/components/layout/app-logo";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left" className="border-r">
      <SidebarHeader className="p-4 flex justify-center items-center h-16 border-b">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center" aria-label="FinanceFlow Home">
          <AppLogo className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold text-primary font-headline group-data-[collapsible=icon]:hidden">FinanceFlow</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2 flex-1">
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                tooltip={{ 
                  children: item.label, 
                  className: cn("group-data-[collapsible=icon]:block hidden", "capitalize") 
                }}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden capitalize">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip={{ 
                children: "Settings", 
                className: "group-data-[collapsible=icon]:block hidden" 
              }}
              className="justify-start"
            >
              <Link href="#"> {/* Replace with actual settings page if created */}
                <Settings className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
             <SidebarMenuButton 
                asChild 
                tooltip={{ 
                  children: "Logout", 
                  className: "group-data-[collapsible=icon]:block hidden"
                }}
                className="justify-start"
              >
               <Link href="#"> {/* Mock logout */}
                <LogOut className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
