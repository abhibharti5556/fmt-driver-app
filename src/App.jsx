import { DriverAppProvider, useDriverApp } from './state/store.jsx';
import PhoneFrame from './components/PhoneFrame.jsx';
import TopBar from './components/TopBar.jsx';
import BottomNav from './components/BottomNav.jsx';
import Toast from './components/Toast.jsx';
import ConfirmModal from './components/ConfirmModal.jsx';

import LoginScreen from './components/screens/LoginScreen.jsx';
import DashboardScreen from './components/screens/DashboardScreen.jsx';
import RouteScreen from './components/screens/RouteScreen.jsx';
import PickupsScreen from './components/screens/PickupsScreen.jsx';
import PickupDetailScreen from './components/screens/PickupDetailScreen.jsx';
import BoxCountScreen from './components/screens/BoxCountScreen.jsx';
import StickersScreen from './components/screens/StickersScreen.jsx';
import PickupDoneScreen from './components/screens/PickupDoneScreen.jsx';
import DeliveriesScreen from './components/screens/DeliveriesScreen.jsx';
import DeliveryDetailScreen from './components/screens/DeliveryDetailScreen.jsx';
import OfdScreen from './components/screens/OfdScreen.jsx';
import PhotoScreen from './components/screens/PhotoScreen.jsx';
import GpsScreen from './components/screens/GpsScreen.jsx';
import PodScreen from './components/screens/PodScreen.jsx';
import PodPreviewScreen from './components/screens/PodPreviewScreen.jsx';
import RemarksScreen from './components/screens/RemarksScreen.jsx';
import DeliveredScreen from './components/screens/DeliveredScreen.jsx';
import TimelineScreen from './components/screens/TimelineScreen.jsx';
import NotificationsScreen from './components/screens/NotificationsScreen.jsx';
import ProfileScreen from './components/screens/ProfileScreen.jsx';

const SCREENS = {
  login: LoginScreen,
  dash: DashboardScreen,
  route: RouteScreen,
  pickups: PickupsScreen,
  pickupDetail: PickupDetailScreen,
  box: BoxCountScreen,
  stickers: StickersScreen,
  pickupDone: PickupDoneScreen,
  deliveries: DeliveriesScreen,
  deliveryDetail: DeliveryDetailScreen,
  ofd: OfdScreen,
  photo: PhotoScreen,
  gps: GpsScreen,
  pod: PodScreen,
  podPreview: PodPreviewScreen,
  remarks: RemarksScreen,
  delivered: DeliveredScreen,
  timeline: TimelineScreen,
  notifs: NotificationsScreen,
  profile: ProfileScreen,
};

const TITLES = {
  dash: ['Friday 05 September', 'Today'],
  route: ['5 stops · auto-sequenced', "Today's route"],
  pickups: ['Assigned to FMT-DRV-042', 'My pickups'],
  pickupDetail: ['Pickup details', null],
  box: ['Step 1 of 1 · loading', 'Box count'],
  stickers: ['Print at pickup', 'Box stickers'],
  pickupDone: ['Pickup', 'Confirmed'],
  deliveries: ['Assigned to FMT-DRV-042', 'My deliveries'],
  deliveryDetail: ['Delivery details', null],
  ofd: ['Delivery in progress', null],
  photo: ['Step 1 of 3 · evidence', 'Shipment photo'],
  gps: ['Step 1 of 3 · location', 'GPS confirmation'],
  pod: ['Step 2 of 3 · proof', 'POD upload'],
  podPreview: ['Step 2 of 3 · proof', 'POD preview'],
  remarks: ['Step 3 of 3 · notes', 'Remarks'],
  delivered: ['Delivery', 'Complete'],
  timeline: ['Shipment timeline', null],
  notifs: ['3 unread', 'Notifications'],
  profile: ['Driver profile', 'Rakesh Yadav'],
};

const SHOWS_BACK = new Set([
  'pickupDetail', 'box', 'stickers', 'deliveryDetail', 'ofd', 'photo', 'gps', 'pod',
  'podPreview', 'remarks', 'timeline', 'notifs', 'pickupDone', 'delivered',
]);

const TAB_FOR_SCREEN = {
  dash: 'home',
  pickups: 'pickups', pickupDetail: 'pickups', box: 'pickups', stickers: 'pickups', pickupDone: 'pickups',
  deliveries: 'delivery', deliveryDetail: 'delivery', ofd: 'delivery', photo: 'delivery',
  gps: 'delivery', pod: 'delivery', podPreview: 'delivery', remarks: 'delivery', delivered: 'delivery',
  route: 'route',
  profile: 'profile',
};

function DriverApp() {
  const { state, a, notifs, actions } = useDriverApp();
  const screen = state.screen;
  const Screen = SCREENS[screen] || DashboardScreen;
  const chrome = screen !== 'login';
  const [kicker, titleOverride] = TITLES[screen] || ['', ''];
  const title = titleOverride === null ? a.id : titleOverride;
  const unreadCount = notifs.filter((n) => n.level !== '0').length;

  return (
    <PhoneFrame>
      {chrome && (
        <TopBar
          kicker={kicker}
          title={title}
          showBack={SHOWS_BACK.has(screen)}
          onBack={actions.back}
          onNotifs={actions.goNotifs}
          notifCount={unreadCount}
        />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1, overflow: 'hidden' }}>
        <Screen />
      </div>
      {chrome && (
        <BottomNav
          active={TAB_FOR_SCREEN[screen] || 'home'}
          onHome={actions.goDash}
          onPickups={actions.goPickups}
          onDeliveries={actions.goDeliveries}
          onRoute={actions.goRoute}
          onProfile={actions.goProfile}
        />
      )}
      <Toast text={state.toast} />
      <ConfirmModal
        open={state.modal === 'ofd'}
        title="Start delivery?"
        body={<>{a.id} will be marked <strong>Out for Delivery</strong> and the customer will be notified. You will then be asked for the shipment photograph and POD.</>}
        confirmLabel="Start delivery"
        onConfirm={actions.confirmOfd}
        onCancel={actions.closeModal}
      />
    </PhoneFrame>
  );
}

export default function App() {
  return (
    <DriverAppProvider>
      <DriverApp />
    </DriverAppProvider>
  );
}
