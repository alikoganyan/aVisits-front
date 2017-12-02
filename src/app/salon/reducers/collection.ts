import * as collection from '../actions/collection';
import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {Salon} from "../salon.model";

export interface SalonEntityState extends EntityCollectionState<Salon> {}

class SalonEntityCollectionReducer extends EntityCollectionReducer<Salon, SalonEntityState> {}

export const salonEntityReducer = new SalonEntityCollectionReducer(
    collection.collectionActions,
    (salon: Salon) => salon.id
);