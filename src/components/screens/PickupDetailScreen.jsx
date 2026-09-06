import { useDriverApp } from '../../state/store.jsx';
import ShipmentDetail from '../ShipmentDetail.jsx';

export default function PickupDetailScreen() {
  const { actions } = useDriverApp();
  return (
    <ShipmentDetail
      addressLabel="Pickup address"
      boxesLabel="Expected boxes"
      typeLabel="Shipment type"
      primaryLabel="Start pickup"
      onPrimary={actions.startPickup}
      footNote="Confirming records time, GPS and the loaded count against this docket."
    />
  );
}
