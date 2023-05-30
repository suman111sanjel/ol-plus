import {parse as Date$parse} from 'Date';
import {now as Date$now} from 'Date';
import $ol$layer$TimeDimensionTile from './ol/layer/TimeDimensionTile';

var ol = window.ol || {};
Date.now = _Date$now || {};
Date.parse = _Date$parse || {};
ol.layer =ol.layer || {};
ol.layer.TimeDimensionTile = $ol$layer$TimeDimensionTile || {};

export default ol;