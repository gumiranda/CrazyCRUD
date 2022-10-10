/* eslint-disable no-unsafe-optional-chaining */
import {
  HttpRequest,
  HttpResponse,
  Validation,
  badRequest,
  ok,
} from "@/application/helpers";
import { Controller } from "@/application/infra/contracts";
import { DeleteFakenews } from "@/slices/fakenews/useCases";

export class DeleteFakenewsController extends Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deleteFakenews: DeleteFakenews
  ) {
    super();
  }
  async execute(httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
    const errors = this.validation.validate(httpRequest?.query);
    if (errors?.length > 0) {
      return badRequest(errors);
    }
    const fakenewsDeleteed = await this.deleteFakenews({
      fields: { ...httpRequest?.query, createdById: httpRequest?.userId },
      options: {},
    });
    return ok(fakenewsDeleteed);
  }
}
