import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GameEffects } from "./game.effects";
import { reducer } from './game.reducer';
import { featureKey } from './game.state';

@NgModule({
  imports: [
    StoreModule.forFeature(featureKey, reducer),
    EffectsModule.forFeature([GameEffects])
  ]
})
export class GameStoreModule { }
