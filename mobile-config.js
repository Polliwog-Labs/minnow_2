App.info({
  name: 'Minnow',
  description: 'Minnow: Collaborative Trip Planning',
  author: 'Ashley Augustini, Joey Benenati, Mac Evans, Ryan Hamblin, Daniel Sato',
  email: 'team.polliwog@gmail.com',
  website: 'http://wildebeest.pw'
});
App.accessRule('*');
App.accessRule("blob:*");

App.icons({
  'iphone':'mobile-assets/icons/ios/icon-60.png',
  'iphone_2x':'mobile-assets/icons/ios/icon-60-2x.png',
  'iphone_3x':'mobile-assets/icons/ios/icon-60-3x.png',
  'ipad':'mobile-assets/icons/ios/icon-72.png',
  'ipad_2x':'mobile-assets/icons/ios/icon-72-2x.png',
  'android_ldpi':'mobile-assets/icons/android/icon-36-ldpi.png',
  'android_mdpi':'mobile-assets/icons/android/icon-48-mdpi.png',
  'android_hdpi':'mobile-assets/icons/android/icon-72-hdpi.png',
  'android_xhdpi':'mobile-assets/icons/android/icon-96-xhdpi.png',
  // 'android_xxhdpi':'mobile-assets/icons/android/icon-144-xxhdpi.png',
  // 'android_xxxhdpi':'mobile-assets/icons/android/icon-192-xxxhdpi.png',
});

App.launchScreens({
  'iphone':'mobile-assets/screens/ios/screen-iphone-portrait.png',
  'iphone_2x':'mobile-assets/screens/ios/screen-iphone-portrait-2x.png',
  'iphone5':'mobile-assets/screens/ios/screen-iphone-portrait-568h-2x.png',
  'iphone6':'mobile-assets/screens/ios/screen-iphone-portrait-667h.png',
  'iphone6p_portrait':'mobile-assets/screens/ios/screen-iphone-portrait-736h.png',
  'ipad_portrait':'mobile-assets/screens/ios/screen-ipad-portrait.png',
  'ipad_portrait_2x':'mobile-assets/screens/ios/screen-ipad-portrait-2x.png',
  'android_ldpi_portrait':'mobile-assets/screens/android/screen-ldpi-portrait.png',
  'android_mdpi_portrait':'mobile-assets/screens/android/screen-mdpi-portrait.png',
  'android_hdpi_portrait':'mobile-assets/screens/android/screen-hdpi-portrait.png',
  'android_xhdpi_portrait':'mobile-assets/screens/android/screen-xhdpi-portrait.png'
});