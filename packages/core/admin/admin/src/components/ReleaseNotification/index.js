import { useEffect } from 'react';
import { useAppInfos, useNotification } from '@strapi/helper-plugin';

const showUpdateNotif = !JSON.parse(localStorage.getItem('STRAPI_UPDATE_NOTIF'));

// TODO
// This should be a hook used in the Admin page
// SWITCH to hook when the rework of the Admin page is under development
const ReleaseNotification = () => {
  const { latestStrapiReleaseTag, shouldUpdateStrapi } = useAppInfos();
  const toggleNotification = useNotification();

  useEffect(() => {
    if (shouldUpdateStrapi && showUpdateNotif) {
      toggleNotification({
        type: 'info',
        message: { id: 'notification.version.update.message' },
        link: {
          url: `https://github.com/strapi/strapi/releases/tag/${latestStrapiReleaseTag}`,
          label: {
            id: 'notification.version.update.link',
          },
        },
        blockTransition: true,
        onClose: () => localStorage.setItem('STRAPI_UPDATE_NOTIF', true),
      });
    }
  }, [latestStrapiReleaseTag, shouldUpdateStrapi, toggleNotification]);

  return null;
};

export default ReleaseNotification;