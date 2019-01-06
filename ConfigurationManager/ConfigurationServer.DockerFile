FROM microsoft/aspnetcore:2.0 AS base
WORKDIR /app

FROM microsoft/aspnetcore-build:2.0 AS builder
ARG Configuration=Release
WORKDIR /src
COPY *.sln ./
COPY SampleConsumerWebApiApp/SampleConsumerWebApiApp.csproj SampleConsumerWebApiApp/
COPY ConfigurationServer/ConfigurationServer.csproj ConfigurationServer/
COPY ConfigurationManager/ConfigurationManager.csproj ConfigurationManager/
COPY ConfigurationManager.Publisher/ConfigurationManager.Publisher.csproj ConfigurationManager.Publisher/
COPY ConfigurationManager.Listener/ConfigurationManager.Listener.csproj ConfigurationManager.Listener/
COPY ConfigurationManager.Models/ConfigurationManager.Models.csproj ConfigurationManager.Models/
RUN dotnet restore
COPY . .
WORKDIR /src/ConfigurationServer
RUN dotnet build -c $Configuration -o /app

FROM builder AS publish
ARG Configuration=Release
RUN dotnet publish -c $Configuration -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "ConfigurationServer.dll"]
