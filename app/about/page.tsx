import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Acerca de Nosotros</h1>
      <p className="text-lg leading-7">
        Bienvenido a Gobierno Abierto. Nuestro objetivo es promover la transparencia y la participación ciudadana en los procesos gubernamentales. Creemos en un gobierno accesible y responsable para todos.
      </p>
      <p className="text-lg leading-7 mt-4">
        Este proyecto está diseñado para facilitar el acceso a información pública y fomentar la colaboración entre ciudadanos y autoridades. Gracias por ser parte de esta iniciativa.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Stack Tecnológico</h2>
      <ul className="list-disc list-inside text-lg leading-7">
        <li>Next.js</li>
        <li>React</li>
        <li>TypeScript</li>
        <li>Tailwind CSS</li>
        <li>Supabase</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4">Contacto</h2>
      <ul className="flex flex-col gap-4 text-lg">
        <li className="flex items-center gap-2">
          <FaEnvelope className="text-xl" />
          <a href="mailto:bertop@gmail.com" className="hover:underline">bertop@gmail.com</a>
        </li>
        <li className="flex items-center gap-2">
          <FaLinkedin className="text-xl" />
          <a href="https://www.linkedin.com/in/bertop89/" target="_blank" rel="noopener noreferrer" className="hover:underline">linkedin.com/in/bertop89</a>
        </li>
        <li className="flex items-center gap-2">
          <FaGithub className="text-xl" />
          <a href="https://github.com/bertop89" target="_blank" rel="noopener noreferrer" className="hover:underline">github.com/bertop89</a>
        </li>
      </ul>
    </div>
  );
}