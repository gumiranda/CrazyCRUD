/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { AddFakenews } from "@/slices/fakenews/useCases";

export class AddFakenewsController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addFakenews: AddFakenews
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.body);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const fakenewsCreated = await this.addFakenews({
      ...httpRequest?.body,
      createdById: httpRequest?.userId,
    });
    return ok(fakenewsCreated);
  }
}
