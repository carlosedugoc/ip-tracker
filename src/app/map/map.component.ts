import {
  Component,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { switchMap } from 'rxjs/operators';
import * as L from 'leaflet';
import { Map, Icon, map, tileLayer } from 'leaflet';
import { MapService } from './map.service';
import { IMap } from './map.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnChanges {
  map: Map;
  @Input() ipToSearch;
  @Output() location = new EventEmitter();

  constructor(private mapService: MapService) {}

  /** Invoke service to get the location corresponding to the Ip Address got as param */
  ngOnChanges(changes: SimpleChanges): void {
    this.mapService
      .searchIp(changes.ipToSearch.currentValue)
      .subscribe((res: IMap) => {
        console.log(JSON.stringify(res));
        const {
          location: { lat, lng },
        } = res;

        this.location.emit(res);
        if (this.map) this.map.remove();
        this.createMap(lat, lng);
      });
  }

  /** SetUp the icons' map */
  smallIcon = new Icon({
    iconUrl: '../../assets/images/icon-location.svg',
    iconRetinaUrl: '../../assets/images/icon-location.svg',
  });

  /** Invoke the service to get the clien IpAddress and then get the location for that Ip Address */
  ngAfterViewInit(): void {
    this.mapService
      .getCurrentIp()
      .pipe(switchMap((res: any) => this.mapService.searchIp(res.ip)))
      .subscribe((res: IMap) => {
        console.log(JSON.stringify(res));
        const {
          location: { lat, lng },
        } = res;
        this.location.emit(res);
        if (this.map) this.map.remove();
        this.createMap(lat, lng);
      });
  }

  /** Helps to render the map inside the HTML */
  createMap(lat: number, lng: number) {
    const parcThabor = { lat, lng };

    const zoomLevel = 12;

    this.map = map('map', {
      center: [parcThabor.lat, parcThabor.lng],
      zoom: zoomLevel,
    });

    const mainLayer = tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { minZoom: 12, maxZoom: 17 }
    );

    mainLayer.addTo(this.map);
    const popupOptions = { coords: parcThabor };
    this.addMarker(popupOptions);
  }

  /** Add a marker to the map */
  addMarker({ coords }) {
    const marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon });
    marker.addTo(this.map);
  }
}
