import { makeLogController } from "@/application/decorators/logControllerFactory";
import { makeValidationComposite } from "@/application/factories";
import { Controller } from "@/application/infra/contracts";
import { makeUpdateFakenewsFactory } from "@/slices/fakenews/useCases";
import { UpdateFakenewsController } from "@/slices/fakenews/controllers";

export const makeUpdateFakenewsController = (): Controller => {
  const requiredFieldsQuery = ["_id"];
  const requiredFieldsBody: any = [];
  return makeLogController(
    "updateFakenews",
    new UpdateFakenewsController(
      makeValidationComposite(requiredFieldsQuery),
      makeValidationComposite(requiredFieldsBody),
      makeUpdateFakenewsFactory()
    )
  );
};
