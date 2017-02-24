import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { plural } from 'pluralize';

import { RESTService } from './rest.service';
import { BaseEntity } from '../../model';

import { log, getCategory } from '../../logging';

const category = getCategory('AbstractStore');

export abstract class AbstractStore<T extends BaseEntity, L extends Array<T>,
  R extends RESTService<T, L>> {

  private _list: BehaviorSubject<L>;

  private _current: BehaviorSubject<T>;

  private _loading: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private service: R, initialList: L, initialCurrent: T) {
    this._list = new BehaviorSubject(initialList);
    this._current = new BehaviorSubject(initialCurrent);
  }

  protected abstract get kind(): string;

  get list() { return this._list.asObservable(); }

  get resource() { return this._current.asObservable(); }

  get loading() { return this._loading.asObservable(); }

  loadAll() {
    this._loading.next(true);
    this.service.list().subscribe(
      (list) => {
        this._list.next(list);
        this._loading.next(false);
      },
      (error) => {
        log.debugc(() => 'Error retrieving ' + plural(this.kind) + ': ' + error, category);
        this._loading.next(false);
      });
  }

  newInstance(): T {
    throw new Error('No `newInstance()` defined for ' + this.kind);
  }

  loadOrCreate(id?: string) {
    if (id) {
      this.load(id);
    } else {
      this._current.next(this.newInstance());
      this._loading.next(false);
    }
  }

  private plain(entity: T): T {
    if ('plain' in entity) {
      return (<any>entity).plain();
    } else {
      return entity;
    }
  }

  load(id: string) {
    this._loading.next(true);
    this.service.get(id).subscribe(
      (entity) => {
        this._current.next(this.plain(entity));
        this._loading.next(false);
      },
      (error) => {
        log.debugc(() => 'Error retrieving ' + this.kind + ': ' + error, category);
        this._loading.next(false);
      });
  }

  create(entity: T): Observable<T> {
    const created = new Subject<T>();
    this.service.create(entity).subscribe(
      (e) => {
        created.next(this.plain(e));
      },
      (error) => {
        log.debugc(() => 'Error creating ' + this.kind + ' (' + JSON.stringify(entity, null, 2) + ')' + ': ' + error, category);
        created.error(error);
      });
    return created.share();
  }

  update(entity: T): Observable<T> {
    const updated = new Subject<T>();
    this.service.update(entity).subscribe(
      (e) => {
        updated.next(this.plain(e));
      },
      (error) => {
        log.debugc(() => 'Error updating ' + this.kind + ' (' + JSON.stringify(entity, null, 2) + ')' + ': ' + error, category);
      });
    return updated.share();
  }

  /*
  deleteEntity(id?: string) {
    if(id) {
      this.service.delete(id);
    }
  }
  */

}