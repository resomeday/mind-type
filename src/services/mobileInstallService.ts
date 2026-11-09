/**
 * Direct Mobile Installation Service for Android & Apple iOS
 */

export function getAppOriginUrl(): string {
  if (typeof window !== 'undefined' && window.location.origin.startsWith('http')) {
    return window.location.origin;
  }
  return 'https://ais-pre-g5rc6dgojhiu7nte2qwhf7-633738735601.asia-east1.run.app';
}

/**
 * Direct Apple (iPhone/iPad) Installation
 * Generates and triggers download of an Apple Configuration Profile (.mobileconfig)
 * which natively adds MIND:TYPE as a standalone WebClip app icon directly to the iOS Home Screen.
 */
export function downloadAppleWebClipProfile(appUrl?: string): string {
  const targetUrl = appUrl || getAppOriginUrl();

  const mobileConfigXml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>PayloadContent</key>
  <array>
    <dict>
      <key>FullScreen</key>
      <true/>
      <key>IsRemovable</key>
      <true/>
      <key>Label</key>
      <string>MIND:TYPE</string>
      <key>PayloadDescription</key>
      <string>MIND:TYPE 다면 성격 &amp; 인간관계 추천 웹앱</string>
      <key>PayloadDisplayName</key>
      <string>MIND:TYPE</string>
      <key>PayloadIdentifier</key>
      <string>com.mindtype.webclip</string>
      <key>PayloadType</key>
      <string>com.apple.webClip.managed</string>
      <key>PayloadUUID</key>
      <string>a78b5e20-334d-45f8-8bb0-2e45cf56184a</string>
      <key>PayloadVersion</key>
      <integer>1</integer>
      <key>Precomposed</key>
      <true/>
      <key>URL</key>
      <string>${targetUrl}</string>
    </dict>
  </array>
  <key>PayloadDescription</key>
  <string>MIND:TYPE 앱을 아이폰/아이패드 홈 화면에 직접 설치합니다.</string>
  <key>PayloadDisplayName</key>
  <string>MIND:TYPE 앱 설치</string>
  <key>PayloadIdentifier</key>
  <string>com.mindtype.profile</string>
  <key>PayloadOrganization</key>
  <string>MIND:TYPE</string>
  <key>PayloadRemovalDisallowed</key>
  <false/>
  <key>PayloadType</key>
  <string>Configuration</string>
  <key>PayloadUUID</key>
  <string>b32f9a10-184e-4b67-a2f0-9f5b61e0892c</string>
  <key>PayloadVersion</key>
  <integer>1</integer>
</dict>
</plist>`;

  const blob = new Blob([mobileConfigXml], { type: 'application/x-apple-aspen-config' });
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = 'MIND_TYPE_iOS_App.mobileconfig';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);

  return '아이폰 설치 프로파일이 다운로드되었습니다! 아이폰 [설정] 앱 상단의 [프로파일이 다운로드됨 ➔ 설치]를 누르시거나, 사파리 하단 [공유 ⎋] ➔ [홈 화면에 추가]를 눌러주세요.';
}

/**
 * Direct Android Installation
 * 1. Invokes PWA prompt if deferred prompt is available
 * 2. Launches Google Chrome directly via Android Intent if in-app browser or supported
 * 3. Or provides direct web shortcut launch
 */
export async function installAndroidDirect(
  triggerPrompt?: () => Promise<'accepted' | 'dismissed' | 'unsupported'>,
  appUrl?: string
): Promise<string> {
  const targetUrl = appUrl || getAppOriginUrl();

  // Try native prompt first
  if (triggerPrompt) {
    try {
      const outcome = await triggerPrompt();
      if (outcome === 'accepted') {
        return '앱 설치가 수락되었습니다! 안드로이드 홈 화면을 확인해 주세요.';
      }
    } catch {}
  }

  // Check userAgent
  const ua = (typeof navigator !== 'undefined' ? navigator.userAgent : '').toLowerCase();
  const isAndroid = /android/.test(ua);
  const isInApp = /kakaotalk|naver|instagram|fbav|line|daum/i.test(ua);

  if (isAndroid || isInApp) {
    const cleanUrl = targetUrl.replace(/^https?:\/\//, '');
    const chromeIntent = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`;
    window.location.href = chromeIntent;
    return '안드로이드 Chrome으로 앱 설치를 진행합니다. 화면에 나타나는 [설치]를 눌러주세요.';
  }

  return 'Chrome 브라우저 우측 상단 메뉴(⋮)에서 [앱 설치] 또는 [홈 화면에 추가]를 눌러주세요.';
}
