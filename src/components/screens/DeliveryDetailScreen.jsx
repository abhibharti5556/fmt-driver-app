import { useDriverApp } from '../../state/store.jsx';
import ShipmentDetail from '../ShipmentDetail.jsx';

export default function DeliveryDetailScreen() {
  const { actions } = useDriverApp();
  return (
    <ShipmentDetail
      addressLabel="Delivery address"
      boxesLabel="Boxes"
      typeLabel="Docket weight slab"
      primaryLabel="Start delivery"
      onPrimary={actions.askStartDelivery}
      footNote="Starting sets the shipment to Out for Delivery and notifies the customer."
    />
  );
}
