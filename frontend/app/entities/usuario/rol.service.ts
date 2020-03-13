import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SERVER_API_URL} from 'app/app.constants';
import {IRol} from 'app/shared/model/rol.model';

type EntityArrayResponseType = HttpResponse<IRol[]>;

@Injectable({providedIn: 'root'})
export class RolService {
    private roles: IRol[] = [];

    public resourceUrl = SERVER_API_URL + 'api/roles';

    constructor(protected http: HttpClient) {
    }

    findAll(): Observable<EntityArrayResponseType> {
        return this.http.get<IRol[]>(this.resourceUrl, {observe: 'response'});
    }

    getRoles(): IRol[] {
        return this.roles;
    }

    setRoles(roles: IRol[]) {
        this.roles = roles;
    }

    isRolesEmpty(): boolean {
        return this.roles.length === 0;
    }
}
