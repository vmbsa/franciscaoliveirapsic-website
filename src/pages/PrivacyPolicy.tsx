import paperTexture from "../assets/paper.png";
import { ArcRing, Divider } from "../components/Ornaments";

const sectionTitle = "font-heading text-2xl font-semibold text-espresso mt-12 mb-4 first:mt-0";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative isolate overflow-hidden bg-sand pb-36 pt-36 md:pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-50 mix-blend-multiply"
          style={{ backgroundImage: `url(${paperTexture})` }}
        />
        <ArcRing className="absolute -right-32 -top-32 -z-10 h-[28rem] w-[28rem] text-espresso/15" />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-heading text-4xl font-bold text-espresso md:text-5xl">
            Política de Privacidade
          </h1>
          <Divider className="mt-6" />
        </div>
      </div>

      <div className="relative z-10 mx-auto -mt-24 max-w-4xl px-6 pb-8">
        <div className="rounded-[2rem] border border-sand/60 bg-white p-8 leading-relaxed text-gray-700 shadow-[0_40px_80px_-45px_rgba(80,49,29,0.45)] md:p-14">
          <h2 className={sectionTitle}>Responsável pelo Tratamento</h2>
          <p>
            Francisca Oliveira<br />
            Psicóloga Clínica<br />
            E-mail: francisca.oliveira.psic@gmail.com
          </p>

          <h2 className={sectionTitle}>Dados Recolhidos</h2>
          <p>
            Este website recolhe os seguintes dados quando preenche um formulário:
          </p>
          <ul className="mt-4 space-y-2 pl-1">
            {["Nome", "Endereço de email", "Número de telefone"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-caramel/70" />
                {item}
              </li>
            ))}
          </ul>

          <h2 className={sectionTitle}>Finalidade</h2>
          <p>
            Os dados são utilizados para responder aos seus contactos, agendar consultas e cumprir obrigações legais.
          </p>

          <h2 className={sectionTitle}>Sigilo Profissional</h2>
          <p>
            Como psicóloga clínica, todos os dados de saúde são tratados sob estrito sigilo profissional, conforme o Código Deontológico da Ordem dos Psicólogos Portugueses.
          </p>

          <h2 className={sectionTitle}>Direitos do Utilizador</h2>
          <p>
            Pode exercer os direitos de acesso, retificação, apagamento, limitação, oposição e portabilidade dos seus dados enviando um email para francisca.oliveira.psic@gmail.com.
          </p>

          <p className="mt-12 border-t border-sand/60 pt-6 text-sm text-mocha/80">
            Última atualização: Abril 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
