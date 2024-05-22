import socialConfig from '@assets/config/social';

export const requestTiktokAuthorizationCodeUrl = shopId =>
  `https://www.tiktok.com/v2/auth/authorize/?client_key=${socialConfig.tiktokClientKey}&scope=user.info.basic,video.list&response_type=code&redirect_uri=${socialConfig.tiktokRedirectUri}&state=${shopId}&code_challenge=1&code_challenge_method=S256`;
