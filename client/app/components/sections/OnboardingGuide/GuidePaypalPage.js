import { PropTypes } from 'react';
import r, { div, h2, p, img, a, span } from 'r-dom';
import css from './OnboardingGuide.css';
import { t } from '../../../utils/i18n';

import GuideBackToTodoLink from './GuideBackToTodoLink';
import infoImage from './images/step5_screenshot_paypal@2x.png';

const GuidePaypalPage = (props) => {
  const { changePage, pageData, infoIcon, routes, stripe_enabled } = props;
  return div({ className: 'container' }, [
    r(GuideBackToTodoLink, { changePage, routes }),
    h2({ className: css.title }, t('web.admin.onboarding.guide.paypal.title')),
    (stripe_enabled ?
      p({ className: css.description }, t('web.admin.onboarding.guide.paypal.description_p1_stripe_paypal', {
        not_sure_link: a(
          {
            href: '#',
            id: 'not_sure_link',
            target: '_blank',
            rel: 'noreferrer',
            alt: t('web.admin.onboarding.guide.paypal.not_sure_link'),
          },
          t('web.admin.onboarding.guide.paypal.not_sure_link')
        ),
      })) :
      p({ className: css.description }, t('web.admin.onboarding.guide.paypal.description_p1'))),
    p({ className: css.description }, t('web.admin.onboarding.guide.paypal.description_p2')),

    div({ className: css.sloganImageContainer }, [
      img({
        className: css.sloganImage,
        src: infoImage,
        alt: t('web.admin.onboarding.guide.paypal.info_image_alt'),
      }),
    ]),

    div({ className: css.infoTextContainer }, [
      div({
        className: css.infoTextIcon,
        dangerouslySetInnerHTML: { __html: infoIcon }, // eslint-disable-line react/no-danger
      }),
      (stripe_enabled ? div({ className: css.infoTextContent }, t('web.admin.onboarding.guide.paypal.advice.content_paypal_stripe', {
        disable_payments_link: a(
          { href: 'https://help.sharetribe.com/payment-with-paypal/how-to-disable-payments-or-add-free-listings-to-your-marketplace',
            target: '_blank',
            rel: 'noreferrer',
            alt: t('web.admin.onboarding.guide.paypal.advice.disable_payments_alt'),
          },
          t('web.admin.onboarding.guide.paypal.advice.disable_payments_link')),
        stripe_paypal_link: a(
          { href: 'https://help.sharetribe.com/differences-between-stripe-and-paypal',
            target: '_blank',
            rel: 'noreferrer',
            alt: t('web.admin.onboarding.guide.paypal.advice.stripe_paypal_link'),
          },
          t('web.admin.onboarding.guide.paypal.advice.stripe_paypal_link')),
      })) : div({ className: css.infoTextContent }, t('web.admin.onboarding.guide.paypal.advice.content', {
        disable_payments_link: a(
          { href: 'https://help.sharetribe.com/payment-with-paypal/how-to-disable-payments-or-add-free-listings-to-your-marketplace',
            target: '_blank',
            rel: 'noreferrer',
            alt: t('web.admin.onboarding.guide.paypal.advice.disable_payments_alt'),
          },
          t('web.admin.onboarding.guide.paypal.advice.disable_payments_link')),
      }))),
    ]),

    div(null, [
      a({ className: css.nextButton, href: routes.admin_payment_preferences_path() }, t('web.admin.onboarding.guide.paypal.setup_payments')),
      span({ className: css.buttonSeparator }, t('web.admin.onboarding.guide.paypal.cta_separator')),
      a({ className: css.nextButtonGhost, href: routes.edit_admin_listing_shape_path(pageData.additional_info.listing_shape_name) }, t('web.admin.onboarding.guide.paypal.disable_payments')),
    ]),
  ]);
};

const { func, string, shape } = PropTypes;

GuidePaypalPage.propTypes = {
  changePage: func.isRequired,
  infoIcon: string.isRequired,
  routes: shape({
    edit_admin_listing_shape_path: func.isRequired,
  }),
  pageData: shape({
    additional_info: shape({
      listing_shape_name: string,
    }).isRequired,
  }).isRequired,
};

export default GuidePaypalPage;
