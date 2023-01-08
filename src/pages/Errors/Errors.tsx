import agent from '../../app/api/agent';
import { Button } from '../../app/components/yandex/dist';

export default function Errors() {
  return (
    <>
      <h1 className="text text_type_main-large mb-8">
        Тесты ошибок приложения
      </h1>
      <Button
        extraClass="mr-8"
        htmlType="button"
        onClick={() =>
          agent.TestErrors.get401Error().catch((e) => console.log(e))
        }
      >
        Тест 401
      </Button>
      <Button
        extraClass="mr-8"
        htmlType="button"
        onClick={() =>
          agent.TestErrors.get403Error().catch((e: any) => console.log(e))
        }
      >
        Тест 403
      </Button>
      <Button
        extraClass="mr-8"
        htmlType="button"
        onClick={() =>
          agent.TestErrors.get404Error().catch((e) => console.log(e))
        }
      >
        Тест 404
      </Button>
      <Button
        extraClass="mr-8"
        htmlType="button"
        onClick={() => agent.TestErrors.getValidationError()}
      >
        Тест валидации
      </Button>
    </>
  );
}
