// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import IconButton from '@mui/material/IconButton'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'

// ** Type Import
import { LayoutProps } from 'src/@core/layouts/types'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

interface Props {
  navHover: boolean
  collapsedNavWidth: number
  hidden: LayoutProps['hidden']
  navigationBorderWidth: number
  toggleNavVisibility: () => void
  settings: LayoutProps['settings']
  saveSettings: LayoutProps['saveSettings']
  navMenuBranding?: LayoutProps['verticalLayoutProps']['navMenu']['branding']
  menuLockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon']
  menuUnlockedIcon?: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon']
}

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(3.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}))

const HeaderTitle = styled(Typography)<TypographyProps>({
  fontWeight: 700,
  lineHeight: '24px',
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
})

const LinkStyled = styled(Link)({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
})

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon
  } = props

  // ** Hooks & Vars
  // const theme = useTheme()
  const { navCollapsed } = settings

  const menuCollapsedStyles = navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 }

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8
      }
    } else {
      return 6
    }
  }

  const MenuLockedIcon = () => userMenuLockedIcon || <Icon icon='tabler:circle-dot' />

  const MenuUnlockedIcon = () => userMenuUnlockedIcon || <Icon icon='tabler:circle' />

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: menuHeaderPaddingLeft() }}>
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <LinkStyled href='/'>
          <svg width='32' height='32' viewBox='0 0 104 116' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M103.39 115.63H88C84.2657 115.63 80.5679 114.894 77.118 113.465C73.668 112.036 70.5335 109.941 67.8934 107.3C65.2533 104.658 63.1594 101.523 61.7312 98.0728C60.3031 94.6223 59.5687 90.9243 59.57 87.19V40.44C63.0178 40.44 66.3244 41.8096 68.7624 44.2476C71.2003 46.6856 72.57 49.9922 72.57 53.44V87.19C72.5687 89.2171 72.9668 91.2247 73.7416 93.0979C74.5165 94.9711 75.6528 96.6733 77.0858 98.1071C78.5187 99.541 80.2202 100.678 82.0929 101.455C83.9656 102.231 85.9728 102.63 88 102.63H90.39V43.72C90.39 35.5726 87.1534 27.7588 81.3923 21.9977C75.6312 16.2366 67.8174 13 59.67 13C56.254 13 52.9779 11.643 50.5624 9.22754C48.147 6.81207 46.79 3.53598 46.79 0.119995V0H59.67C71.2652 0 82.3856 4.60621 90.5847 12.8053C98.7838 21.0044 103.39 32.1247 103.39 43.72V115.63Z'
              fill='url(#paint0_linear_73_2)'
            />
            <path
              d='M0 1.75882e-06H15.39C19.1243 -0.00131176 22.8223 0.733103 26.2728 2.16126C29.7232 3.58941 32.8585 5.68333 35.4995 8.32343C38.1405 10.9635 40.2356 14.0981 41.6649 17.548C43.0943 20.9979 43.83 24.6957 43.83 28.43V75.19C40.3822 75.19 37.0756 73.8204 34.6376 71.3824C32.1996 68.9444 30.83 65.6378 30.83 62.19V28.43C30.83 26.4029 30.4306 24.3956 29.6545 22.5229C28.8784 20.6502 27.741 18.9487 26.3071 17.5158C24.8733 16.0829 23.1711 14.9465 21.2979 14.1717C19.4247 13.3968 17.4171 12.9987 15.39 13H13V71.9C13 80.0501 16.2376 87.8664 22.0006 93.6294C27.7636 99.3924 35.5799 102.63 43.73 102.63C47.1443 102.63 50.4188 103.986 52.834 106.399C55.2492 108.812 56.6073 112.086 56.61 115.5V115.63H43.73C32.1321 115.63 21.0092 111.023 12.8082 102.822C4.60725 94.6208 0 83.4979 0 71.9V1.75882e-06Z'
              fill='url(#paint1_linear_73_2)'
            />
            <defs>
              <linearGradient
                id='paint0_linear_73_2'
                x1='46.79'
                y1='57.815'
                x2='103.39'
                y2='57.815'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#27DF99' />
                <stop offset='1' stopColor='#BEF466' />
              </linearGradient>
              <linearGradient
                id='paint1_linear_73_2'
                x1='2.10889e-07'
                y1='57.815'
                x2='56.61'
                y2='57.815'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#27DF99' />
                <stop offset='1' stopColor='#BEF466' />
              </linearGradient>
            </defs>
          </svg>

          <HeaderTitle variant='h4' sx={{ ...menuCollapsedStyles, ...(navCollapsed && !navHover ? {} : { ml: 2.5 }) }}>
            {themeConfig.templateName}
          </HeaderTitle>
        </LinkStyled>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{ p: 0, color: 'text.secondary', backgroundColor: 'transparent !important' }}
        >
          <Icon icon='tabler:x' fontSize='1.25rem' />
        </IconButton>
      ) : userMenuLockedIcon === null && userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
          sx={{
            p: 0,
            color: 'text.primary',
            backgroundColor: 'transparent !important',
            '& svg': {
              fontSize: '1.25rem',
              ...menuCollapsedStyles,
              transition: 'opacity .25s ease-in-out'
            }
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  )
}

export default VerticalNavHeader
