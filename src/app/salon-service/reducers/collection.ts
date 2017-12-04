import * as collection from '../actions/collection';
import {EntityCollectionReducer, EntityCollectionState} from "../../entity-collection/entity-collection.reducer";
import {SalonServiceModel} from "../salon-service.model";

export interface SalonServiceEntityState extends EntityCollectionState<SalonServiceModel> {}

class SalonServiceEntityCollectionReducer extends EntityCollectionReducer<SalonServiceModel, SalonServiceEntityState> {}

export const salonServiceEntityReducer = new SalonServiceEntityCollectionReducer(
    collection.collectionActions,
    (salonService: SalonServiceModel) => salonService.id
);