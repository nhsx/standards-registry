import Script from 'next/script';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '../../helpers/gtag';

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
export const GA_TAG_ID = process.env.NEXT_PUBLIC_TAG_ID;

export function Analytics() {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const consentChoice = getCookie('localConsent');
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied'
            });


            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','${GA_TAG_ID}');`,
        }}
      />

      {consentChoice === true && (
        <Script
          id="consupd"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          gtag('consent', 'update', {
            'ad_storage': 'granted',
            'analytics_storage': 'granted'
          });
        `,
          }}
        />
      )}
    </>
  );
}
