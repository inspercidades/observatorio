"use client";

import * as React from "react";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OPEN_COOKIE_PREFERENCES_EVENT, readCookieConsent } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "small" | "mini";
  demo?: boolean;
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
  title?: string;
  description?: string;
  acceptHint?: string;
  acceptLabel?: string;
  declineLabel?: string;
  learnMoreLabel?: string;
  learnMoreHref?: string;
}

const CookieConsent = React.forwardRef<HTMLDivElement, CookieConsentProps>(
  (
    {
      variant = "default",
      demo = false,
      onAcceptCallback = () => {},
      onDeclineCallback = () => {},
      className,
      title = "We use cookies",
      description = "We use cookies to ensure you get the best experience on our website. For more information on how we use cookies, please see our cookie policy.",
      acceptHint = 'By clicking "Accept", you agree to our use of cookies.',
      acceptLabel = "Accept",
      declineLabel = "Decline",
      learnMoreLabel = "Learn more",
      learnMoreHref = "#",
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hide, setHide] = React.useState(true);

    const dismiss = React.useCallback((callback: () => void) => {
      setIsOpen(false);
      callback();
      window.setTimeout(() => {
        setHide(true);
      }, 700);
    }, []);

    const handleAccept = React.useCallback(() => {
      dismiss(onAcceptCallback);
    }, [dismiss, onAcceptCallback]);

    const handleDecline = React.useCallback(() => {
      dismiss(onDeclineCallback);
    }, [dismiss, onDeclineCallback]);

    const show = React.useCallback(() => {
      setHide(false);
      setIsOpen(false);
      window.requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }, []);

    React.useEffect(() => {
      if (!demo && readCookieConsent() !== null) return;
      show();
    }, [demo, show]);

    React.useEffect(() => {
      const openPreferences = () => show();
      window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
      return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, openPreferences);
    }, [show]);

    if (hide) return null;

    const containerClasses = cn(
      "fixed z-50 transition-all duration-700",
      !isOpen ? "translate-y-full opacity-0" : "translate-y-0 opacity-100",
      className,
    );

    const commonWrapperProps = {
      ref,
      className: cn(
        containerClasses,
        variant === "mini"
          ? "left-0 right-0 sm:left-4 bottom-4 w-full sm:max-w-3xl"
          : "bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md",
      ),
      ...props,
    };

    if (variant === "default") {
      return (
        <div {...commonWrapperProps}>
          <Card className="m-3 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              <Cookie className="h-5 w-5" />
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
              <p className="text-xs text-muted-foreground">{acceptHint}</p>
              <LearnMore href={learnMoreHref} label={learnMoreLabel} />
            </CardContent>
            <CardFooter className="flex gap-2 pt-2">
              <Button
                type="button"
                onClick={handleDecline}
                variant="secondary"
                className="flex-1"
              >
                {declineLabel}
              </Button>
              <Button type="button" onClick={handleAccept} className="flex-1">
                {acceptLabel}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (variant === "small") {
      return (
        <div {...commonWrapperProps}>
          <Card className="m-3 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 h-0 px-4">
              <CardTitle className="text-base">{title}</CardTitle>
              <Cookie className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pt-0 pb-2 px-4">
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex gap-2 h-0 py-2 px-4">
              <Button
                type="button"
                onClick={handleDecline}
                variant="secondary"
                size="sm"
                className="flex-1 rounded-full"
              >
                {declineLabel}
              </Button>
              <Button
                type="button"
                onClick={handleAccept}
                size="sm"
                className="flex-1 rounded-full"
              >
                {acceptLabel}
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    if (variant === "mini") {
      return (
        <div {...commonWrapperProps}>
          <Card className="mx-3 p-0 py-3 shadow-lg">
            <CardContent className="sm:flex grid gap-4 p-0 px-3.5">
              <CardDescription className="text-xs sm:text-sm flex-1">
                {description}
              </CardDescription>
              <div className="flex items-center gap-2 justify-end sm:gap-3">
                <Button
                  type="button"
                  onClick={handleDecline}
                  size="sm"
                  variant="secondary"
                  className="text-xs h-7"
                >
                  {declineLabel}
                </Button>
                <Button
                  type="button"
                  onClick={handleAccept}
                  size="sm"
                  className="text-xs h-7"
                >
                  {acceptLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return null;
  },
);

function LearnMore({ href, label }: { href: string; label: string }) {
  const className = "text-xs text-primary underline underline-offset-4 hover:no-underline";

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

CookieConsent.displayName = "CookieConsent";
export { CookieConsent };
export default CookieConsent;
