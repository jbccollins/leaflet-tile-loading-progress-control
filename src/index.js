import L from 'leaflet';
import Control from './control';

var TileLoadingProgress = L.Util.extend(Control.class, {});

export default TileLoadingProgress;

L.Util.extend(L.Control, {
  TileLoadingProgress: TileLoadingProgress,
  tileLoadingProgress: Control.factory
});